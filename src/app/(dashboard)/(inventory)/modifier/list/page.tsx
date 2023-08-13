"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ItemModifierTable } from "@/components/tables/item-modifier-table";

export default function ItemModifiersListPage() {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Lista de Modificadores</h2>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="ml-auto hidden h-8 lg:flex"
					onClick={() => {
						router.push("/modifier/create");
					}}
				>
					<Plus className="mr-2 h-4 w-4" />
					Crear Modificador
				</Button>
			</div>
			<ItemModifierTable />
		</>
	);
}
