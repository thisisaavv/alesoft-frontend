"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { Discount } from "@/lib/validations/discount";
import { Action } from "@/components/data-table-row-actions";
import { useGetSeveralDiscounts } from "@/hooks/discount/use-get-several-discounts";
import { useDeleteDiscount } from "@/hooks/discount/use-delete-discount";

const columnsDef: Columns<Discount>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "amount_type",
		title: "Tipo de monto",
	},
	{
		key: "amount",
		title: "Monto",
	},
	{
		key: "note",
		title: "Nota",
	},
];

const actions = ({ deleteDiscount }: { deleteDiscount: any }): Action<Discount> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este descuento?")) return;
			deleteDiscount({ id: row.original.id });
		},
	},
});

export function DiscountTable() {
	const severalDiscountsQuery = useGetSeveralDiscounts();
	const deleteDiscountQuery = useDeleteDiscount();

	const discountsList = severalDiscountsQuery.data?.data?.data || [];
	const discountsListFiltered = discountsList?.map((discount: any) => ({
		...discount,
		amount_type: discount.amount_type === "PERCENTAGE" ? "Porcentaje" : "Monto",
	}));
	const rowActions = actions({ deleteDiscount: deleteDiscountQuery.mutate });
	const discountColumns = serialiseColumns<Discount>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ name: "Nombre" }}
			columns={discountColumns}
			data={discountsListFiltered}
		/>
	);
}
