"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaxTable } from "@/components/tables/tax-table";

export default function TaxListPage() {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Lista de Impuestos</h2>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
						onClick={() => {
							router.push("/tax/create");
						}}
					>
						<Plus className="mr-2 h-4 w-4" />
						Crear Impuesto
					</Button>
				</div>
			</div>
			<TaxTable />
		</>
	);
}
