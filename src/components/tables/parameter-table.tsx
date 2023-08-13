"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { Parameter } from "@/lib/validations/parameter";
import { Action } from "@/components/data-table-row-actions";
import { useGetSeveralParameters } from "@/hooks/parameter/use-get-several-parameters";
import { useDeleteParameter } from "@/hooks/parameter/use-delete-parameter";

const columnsDef: Columns<Parameter>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "value",
		title: "Valor",
	},
	{
		key: "description",
		title: "Descripción",
	},
];

const actions = ({ deleteItemCategory }: any): Action<Parameter> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar esta categoría?")) return;
			deleteItemCategory({ id: row.original.id });
		},
	},
});

export function ParameterTable() {
	const severalParametersQuery = useGetSeveralParameters();
	const deleteParameterQuery = useDeleteParameter();

	const parametersList = severalParametersQuery.data?.data?.data || [];
	const rowActions = actions({ deleteItemCategory: deleteParameterQuery.mutate });
	const parametersColumns = serialiseColumns<Parameter>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ name: "Nombre" }}
			columns={parametersColumns}
			data={parametersList}
		/>
	);
}
