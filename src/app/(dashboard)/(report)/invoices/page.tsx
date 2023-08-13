"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InvoiceTable } from "@/components/tables/invoice-table";

export default function InvoiceListPage() {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Lista de Facturas</h2>
				</div>
				<div className="flex items-center space-x-2">
					{/* <Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
						onClick={() => {jk
							router.push("/invoice/create");
						}}
					>
						<Plus className="mr-2 h-4 w-4" />
						Crear Categoría
					</Button> */}
				</div>
			</div>
			<InvoiceTable />
		</>
	);
}
