"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@/components/details-view";
import { useGetTax } from "@/hooks/tax/use-get-tax";

const publicHeaders = {
	id: "ID",
	name: "Nombre",
	description: "Descripción",
	rate: "Tarifa",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function TaxDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getTaxQuery = useGetTax(id);
	const { data, isLoading } = getTaxQuery;
	const taxData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Impuesto</h2>
				</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={taxData} />}
		</>
	);
}
