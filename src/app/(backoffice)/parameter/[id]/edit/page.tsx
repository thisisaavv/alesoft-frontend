"use client";

import { useParams } from "next/navigation";

import { useGetParameter } from "@/hooks/parameter/use-get-parameter";
import { ParameterForm } from "@/components/forms/parameter-form";

export default function ParameterEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getParameterQuery = useGetParameter(id);
	const { data, isLoading, isError, error } = getParameterQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Modificar Parámetro</h2>
			</div>
			<ParameterForm data={data.data} />
		</>
	);
}
