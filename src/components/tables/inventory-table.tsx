"use client";

import * as React from "react";

import { Columns } from "../../types";
import { Inventory } from "@/lib/validations/inventory";
import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { useDeleteInventory } from "@/hooks/inventory/use-delete-inventory";
import { useGetSeveralInventories } from "@/hooks/inventory/use-get-several-inventories";
import { Action } from "@/components/data-table-row-actions";

const columnsDef: Columns<Inventory>[] = [
	{
		key: "name",
		title: "Nombre",
	},
];

const actions = ({ deleteInventory }: any): Action<Inventory> => {
	return {
		delete: {
			title: "Eliminar",
			onClick: ({ row }) => {
				if (!confirm("¿Está seguro de que desea eliminar esta venta?")) return;
				deleteInventory({ id: row.original.id });
			},
		},
		disabled: {
			title: ["Habilitar", "Deshabilitar"],
			onClick: function () {
				this.title = this.title.reverse();
			},
		},
	};
};

export function InventoryTable() {
	const severalInventoriesQuery = useGetSeveralInventories();
	const deleteInventoryQuery = useDeleteInventory();

	const inventoriesList = severalInventoriesQuery.data?.data?.data || [];
	const rowActions = actions({ deleteInventory: deleteInventoryQuery.mutate });
	const columns = serialiseColumns<Inventory>(columnsDef, rowActions);

	return <DataTable filterBy={{ name: "Nombre" }} columns={columns} data={inventoriesList} />;
}
