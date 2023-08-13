"use client";

import { useParams } from "next/navigation";
import { ItemModifierForm } from "@/components/forms/item-modifier-form";
import { useGetItemModifier } from "@/hooks/item-modifier/use-get-item-modifier";

export default function ItemModifierEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getItemModifierQuery = useGetItemModifier(id);
	const { data, isLoading, isError, error } = getItemModifierQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Editar Modificador</h2>
			</div>
			<ItemModifierForm data={data.data} />
		</>
	);
}
