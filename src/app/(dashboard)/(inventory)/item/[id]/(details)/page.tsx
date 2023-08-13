"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetItem } from "@/hooks/item/use-get-item";

const publicHeaders = {
	id: "ID",
	user_id: "Nombre de usuario",
	name: "Nombre",
	description: "Descripción",
	quantity: "Stock",
	price: "Precio",
};
const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};
const headers = { ...publicHeaders, ...protectedHeaders } as const as Record<string, string>;

export default function ItemDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getItemQuery = useGetItem(id);
	const { data, isLoading } = getItemQuery;
	const itemData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Detalles de Producto</h2>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={itemData} />}
		</>
	);
}
