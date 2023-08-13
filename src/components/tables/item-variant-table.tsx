"use client";

import * as React from "react";

import { ItemVariant } from "@/lib/validations/item-variant";
import { Columns } from "../../types";
import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Action } from "@/components/data-table-row-actions";
import { useDeleteItemVariant } from "@/hooks/item-variant/use-delete-item-variant";
import { useGetSeveralItemVariants } from "@/hooks/item-variant/use-get-several-item-variants";

const columnsDef: Columns<ItemVariant>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "options",
		title: "Opciones",
	},
];

const actions = ({ deleteItemVariant }: { deleteItemVariant: any }): Action<ItemVariant> => {
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
				deleteItemVariant({ id: row.original.id });
			},
		},
	};
};

export function ItemVariantTable() {
	const severalItemVariantsQuery = useGetSeveralItemVariants();
	const deleteItemVariantQuery = useDeleteItemVariant();

	const itemVariantsList = severalItemVariantsQuery.data?.data?.data || [];
	const rowActions = actions({ deleteItemVariant: deleteItemVariantQuery.mutate });
	const columns = serialiseColumns<ItemVariant>(columnsDef, rowActions);

	return <DataTable filterBy={{ name: "Nombre" }} columns={columns} data={itemVariantsList} />;
}
