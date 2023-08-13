"use client";

import { useParams } from "next/navigation";
import { TaxForm } from "@/components/forms/tax-form";
import { useGetTax } from "@/hooks/tax/use-get-tax";

export default function TaxEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getTaxQuery = useGetTax(id);
	const { data, isLoading, isError, error } = getTaxQuery;

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <div>Error: {<>{error}</>}</div>;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Modificar Impuesto</h2>
				</div>
			</div>
			<TaxForm data={data.data} />
		</>
	);
}
