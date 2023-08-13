"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@/components/details-view";
import { useGetItemCategory } from "@/hooks/item-category/use-get-item-category";

const publicHeaders = {
	id: "ID",
	first_name: "Primer nombre",
	middle_name: "Segundo nombre",
	last_name: "Apellido",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function ItemCategoryDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getItemCategoryQuery = useGetItemCategory(id);
	const { data, isLoading } = getItemCategoryQuery;
	const itemCategoryData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Categoría</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={itemCategoryData} />}
		</>
	);
}
