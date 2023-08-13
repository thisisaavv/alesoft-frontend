"use client";

import { useParams } from "next/navigation";

import { ItemCategoryForm } from "@/components/forms/item-category-form";
import { useGetItemCategory } from "@/hooks/item-category/use-get-item-category";

export default function ItemCategoryEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getItemCategoryQuery = useGetItemCategory(id);
	const { data, isLoading, isError, error } = getItemCategoryQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Modificar Categoría</h2>
				</div>
			</div>
			<ItemCategoryForm data={data.data} />
		</>
	);
}
