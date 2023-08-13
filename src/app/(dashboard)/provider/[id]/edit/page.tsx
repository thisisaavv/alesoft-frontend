"use client";

import { useParams } from "next/navigation";

import { useGetProvider } from "@/hooks/provider/use-get-provider";
import { ProviderForm } from "@/components/forms/provider-form";

export default function ProviderEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getProviderQuery = useGetProvider(id);
	const { data, isLoading, isError, error } = getProviderQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Modificar Proveedor</h2>
			</div>
			<ProviderForm data={data.data} />
		</>
	);
}
