"use client";

import * as React from "react";

import { ItemModifier } from "@/lib/validations/item-modifier";
import { Columns } from "../../types";
import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Action } from "@/components/data-table-row-actions";
import { useDeleteItemModifier } from "@/hooks/item-modifier/use-delete-item-modifier";
import { useGetSeveralItemModifiers } from "@/hooks/item-modifier/use-get-several-item-modifiers";

const columnsDef: Columns<ItemModifier>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "options",
		title: "Opciones",
	},
];

const actions = ({ deleteItemModifier }: { deleteItemModifier: any }): Action<ItemModifier> => {
	return {
		// disabled: {
		// 	title: ["Habilitar", "Deshabilitar"],
		// 	onClick: function () {
		// 		this.title = this.title.reverse();
		// 	},
		// },
		delete: {
			title: "Eliminar",
			onClick: ({ row }) => {
				if (!confirm("¿Está seguro de que desea eliminar este elemento?")) return;
				deleteItemModifier({ id: row.original.id });
			},
		},
	};
};

export function ItemModifierTable() {
	const severalItemModifiersQuery = useGetSeveralItemModifiers();
	const deleteItemModifierQuery = useDeleteItemModifier();

	const itemModifiersList = severalItemModifiersQuery.data?.data.data || [];
	const itemModifiersListFiltered = itemModifiersList.map((itemModifier: any) => ({
		...itemModifier,
		options: itemModifier.options.map((option: any) => option.name),
	}));
	const rowActions = actions({ deleteItemModifier: deleteItemModifierQuery.mutate });
	const columns = serialiseColumns<ItemModifier>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ name: "Nombre" }}
			columns={columns}
			data={itemModifiersListFiltered}
		/>
	);
}
