"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useGetSeveralSales } from "@/hooks/sale/use-get-several-sales";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { formatCurrency } from "@/lib/utils";
import { Icons } from "@/components/icons";

export default function PosOverviewPage() {
	const router = useRouter();
	const severalSalesQuery = useGetSeveralSales();
	const salesList = severalSalesQuery.data?.data?.data || [];

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Vista General</h2>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
						onClick={() => {
							router.push("/pos/terminal");
						}}
					>
						<Plus className="mr-2 h-4 w-4" />
						Aceptar pago
					</Button>
				</div>
			</div>
			<div>
				<div>
					<h2 className="text-xl font-medium tracking-tight mb-4">Actividad</h2>
				</div>
				<div>
					{severalSalesQuery.isLoading && "Cargando..."}
					{severalSalesQuery.isError && "Error"}
					{salesList.map((sale: any) => (
						<div key={sale.id}>
							{/* <h2 className="font-semibold">
								{new Date(sale.created_at).toLocaleDateString("en-MX", {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})
								}
							</h2> */}
							<div
								className="flex items-center justify-between hover:bg-accent p-2 py-4 rounded-sm border-b cursor-pointer"
								onClick={() => router.push(`/sale/${sale.id}`)}
							>
								<div className="flex items-center">
									<div className="mr-2 p-2 bg-accent rounded-sm">
										<Icons.cash className="h-6 w-6" />
									</div>
									<div className="text-sm">
										<p className="font-semibold">
											{sale?.sale_items === null && "Cantidad personalizada"}
											{sale?.sale_items &&
												sale?.sale_items
													?.map((item: any) => item?.Item?.name)
													.join(", ")}
										</p>
										<span className="text-xs">{sale.code}</span>
									</div>
								</div>
								<div className="text-sm text-foreground flex flex-col items-end">
									<span className="font-semibold">
										{formatCurrency(sale.total)}
									</span>
									<p className="text-xs">
										{new Date(sale.created_at).toLocaleTimeString("en-US", {
											hour: "numeric",
											minute: "numeric",
											hour12: true,
										})}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
