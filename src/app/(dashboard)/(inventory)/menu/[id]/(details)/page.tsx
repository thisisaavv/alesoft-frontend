"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@/components/details-view";
import { useGetMenu } from "@/hooks/menu/use-get-menu";

const publicHeaders = {
	id: "ID",
	name: "Nombre",
	description: "Descripción",
	image_url: "URL de imagen",
};
const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};
const headers = { ...publicHeaders, ...protectedHeaders };

export default function MenuDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getMenuQuery = useGetMenu(id);
	const { data, isLoading } = getMenuQuery;
	const menuData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Menú</h2>
				</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={menuData} />}
		</>
	);
}
