"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetItemVariant } from "@/hooks/item-variant/use-get-item-variant";

const publicHeaders = {
	id: "ID",
	name: "Nombre",
	options: "Opciones",
};
const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};
const headers = { ...publicHeaders, ...protectedHeaders } as const as Record<string, string>;

export default function ItemVariantDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getItemVariantQuery = useGetItemVariant(id);
	const { data, isLoading } = getItemVariantQuery;
	const itemVariantData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Variante</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={itemVariantData} />}
		</>
	);
}
