"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetItemModifier } from "@/hooks/item-modifier/use-get-item-modifier";

const publicHeaders = {
	id: "ID",
	user_id: "Nombre de usuario",
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

export default function ItemModifierDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getItemModifierQuery = useGetItemModifier(id);
	const { data, isLoading } = getItemModifierQuery;
	const itemModifierData = data?.data || [];
	const itemModifierDataFiltered = itemModifierData?.map((item: any) => ({
		...item,
		options: item.options?.map((option: any) => option.name),
	}));

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Detalles de Modificador</h2>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={itemModifierData} />}
		</>
	);
}
