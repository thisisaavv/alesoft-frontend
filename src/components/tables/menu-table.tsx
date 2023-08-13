"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { Menu } from "@/lib/validations/menu";
import { useGetSeveralJobs } from "@/hooks/job/use-get-several-jobs";
import { useDeleteJob } from "@/hooks/job/use-delete-job";
import { Action } from "@/components/data-table-row-actions";
import { useDeleteMenu } from "@/hooks/menu/use-delete-menu";
import { useGetSeveralMenus } from "@/hooks/menu/use-get-several-menus";

const columnsDef: Columns<Menu>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "description",
		title: "Descripción",
	},
	{
		key: "items_count" as any,
		title: "Cantidad de items",
	},
];

const actions = ({ deleteMenu }: { deleteMenu: any }): Action<Menu> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este menú?")) return;
			deleteMenu({ id: row.original.id });
		},
	},
});

export function MenuTable() {
	const severalMenusQuery = useGetSeveralMenus();
	const deleteMenuQuery = useDeleteMenu();

	const menusList = severalMenusQuery.data?.data?.data || [];
	const menusListFiltered = menusList?.map((menu: any) => ({
		...menu,
	}));
	const rowActions = actions({ deleteMenu: deleteMenuQuery.mutate });
	const jobColumns = serialiseColumns<Menu>(columnsDef, rowActions);

	return (
		<DataTable filterBy={{ name: "Nombre" }} columns={jobColumns} data={menusListFiltered} />
	);
}
