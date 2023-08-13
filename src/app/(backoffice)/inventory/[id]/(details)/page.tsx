"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetInventory } from "@/hooks/inventory/use-get-inventory";

const publicHeaders = {
	id: "ID",
	name: "Nombre",
	description: "Descripción",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function InventoryDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getInventoryQuery = useGetInventory(id);
	const { data, isLoading } = getInventoryQuery;
	const inventoryData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Inventario</h2>
				</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={inventoryData} />}
		</>
	);
}
