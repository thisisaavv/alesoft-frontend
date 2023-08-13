"use client";

import { useParams } from "next/navigation";

import { useGetMenu } from "@/hooks/menu/use-get-menu";
import { MenuForm } from "@/components/forms/menu-form";

export default function MenuEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getMenuQuery = useGetMenu(id);
	const { data, isLoading, isError, error } = getMenuQuery;

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
					<h2 className="text-2xl font-bold tracking-tight">Modificar Menú</h2>
				</div>
			</div>
			<MenuForm data={data.data} />
		</>
	);
}
