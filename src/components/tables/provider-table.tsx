"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { Action } from "@/components/data-table-row-actions";
import { Provider } from "@/lib/validations/provider";
import { useDeleteProvider } from "@/hooks/provider/use-delete-provider";
import { useGetSeveralProviders } from "@/hooks/provider/use-get-several-providers";

const columnsDef: Columns<Provider>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "bussiness_id",
		title: "RTN",
	},
	{
		key: "phones" as any,
		title: "Teléfono",
	},
	// {
	// 	key: "address" as any,
	// 	title: "Dirección",
	// },
];

const actions = ({ deleteProvider }: any): Action<Provider> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este elemento?")) return;
			deleteProvider({ id: row.original.id });
		},
	},
});

export function ProviderTable() {
	const severalProvidersQuery = useGetSeveralProviders();
	const deleteProviderQuery = useDeleteProvider();

	const providersList = severalProvidersQuery.data?.data?.data || [];
	const providersListFiltered = providersList?.map((provider: any) => ({
		...provider,
	}));
	const rowActions = actions({ deleteProvider: deleteProviderQuery.mutate });
	const providerColumns = serialiseColumns<Provider>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ name: "Nombre" }}
			columns={providerColumns}
			data={providersListFiltered}
		/>
	);
}
