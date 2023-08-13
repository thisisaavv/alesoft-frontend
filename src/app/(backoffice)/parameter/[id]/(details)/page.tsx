"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetParameter } from "@/hooks/parameter/use-get-parameter";

const publicHeaders = {
	id: "ID",
	name: "Nombre",
	value: "Valor",
	description: "Descripción",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function ParameterDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getParameterQuery = useGetParameter(id);
	const { data, isLoading } = getParameterQuery;
	const parameterData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Detalles de Parámetro</h2>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={parameterData} />}
		</>
	);
}
