"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { ItemCategory } from "@/lib/validations/item-category";
import { Action } from "@/components/data-table-row-actions";
import { useGetSeveralItemCategories } from "@/hooks/item-category/use-get-several-item-categories";
import { useDeleteItemCategory } from "@/hooks/item-category/use-delete-item-category";

const columnsDef: Columns<ItemCategory>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "description",
		title: "Descripción",
	},
];

const actions = ({ deleteItemCategory }: any): Action<ItemCategory> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar esta categoría?")) return;
			deleteItemCategory({ id: row.original.id });
		},
	},
});

export function ItemCategoryTable() {
	const severalItemCategoriesQuery = useGetSeveralItemCategories();
	const deleteItemCategoryQuery = useDeleteItemCategory();

	const itemCategoriesList = severalItemCategoriesQuery.data?.data?.data || [];
	const itemCategoriesListFiltered = itemCategoriesList?.map((itemCategory: any) => ({
		...itemCategory,
	}));
	const rowActions = actions({ deleteItemCategory: deleteItemCategoryQuery.mutate });
	const itemCategoryColumns = serialiseColumns<ItemCategory>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ name: "Nombre" }}
			columns={itemCategoryColumns}
			data={itemCategoriesListFiltered}
		/>
	);
}
