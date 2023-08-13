"use client";

import { useParams } from "next/navigation";

import { useGetDiscount } from "@/hooks/discount/use-get-discount";
import { DiscountForm } from "@/components/forms/discount-form";

export default function DiscountEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getDiscountQuery = useGetDiscount(id);
	const { data, isLoading, isError, error } = getDiscountQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Modificar Descuento</h2>
				</div>
			</div>
			<DiscountForm data={data.data} />
		</>
	);
}
