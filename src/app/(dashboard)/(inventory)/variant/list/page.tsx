"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ItemVariantTable } from "@/components/tables/item-variant-table";

export default function ItemVariantListPage() {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Lista de Variantes</h2>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
						onClick={() => {
							router.push("/variant/create");
						}}
					>
						<Plus className="mr-2 h-4 w-4" />
						Crear Variante
					</Button>
				</div>
			</div>
			<ItemVariantTable />
		</>
	);
}
