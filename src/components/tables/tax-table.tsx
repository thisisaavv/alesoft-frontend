"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { Tax } from "@/lib/validations/tax";
import { Action } from "@/components/data-table-row-actions";
import { useGetSeveralTaxes } from "@/hooks/tax/use-get-several-taxes";
import { useDeleteTax } from "@/hooks/tax/use-delete-tax";

const columnsDef: Columns<Tax>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "rate",
		title: "Tasa",
	},
	{
		key: "description",
		title: "Descripción",
	},
];

const actions = ({ deleteTax }: { deleteTax: any }): Action<Tax> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este impuesto?")) return;
			deleteTax({ id: row.original.id });
		},
	},
});

export function TaxTable() {
	const severalTaxesQuery = useGetSeveralTaxes();
	const deleteTaxQuery = useDeleteTax();

	const taxesList = severalTaxesQuery.data?.data?.data || [];
	const taxesListFiltered = taxesList?.map((tax: any) => ({
		...tax,
	}));
	const rowActions = actions({ deleteTax: deleteTaxQuery.mutate });
	const taxColumns = serialiseColumns<Tax>(columnsDef, rowActions);

	return (
		<DataTable filterBy={{ name: "Nombre" }} columns={taxColumns} data={taxesListFiltered} />
	);
}
