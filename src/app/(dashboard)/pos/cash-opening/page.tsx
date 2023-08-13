"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useGetSeveralCashRegisters } from "@/hooks/cash-register/use-get-several-cash-registers";
import { formatCurrency } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CashOpeningForm } from "@/components/forms/cash-opening-form";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSeveralSales } from "@/hooks/sale/use-get-several-sales";

export default function CashRegisterPage() {
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
	const [cashRegisterData, setCashRegisterData] = React.useState<any>({
		opening_amount: 0,
		closing_amount: 4,
		total_sales: 2,
		note: "",
	});
	const severalCashRegistersQuery = useGetSeveralCashRegisters({
		open: true,
	});
	const { data: severalSales } = useGetSeveralSales({
		today: true,
	});

	const todaySales = severalSales?.data?.data;
	const totalTodaySalesAmount =
		todaySales?.reduce((acc: any, sale: any) => acc + sale.total, 0) || 1;
	const cashRegisterList = severalCashRegistersQuery.data?.data?.data || [];
	const isCashRegisterOpen = cashRegisterList.length > 0;

	React.useEffect(() => {
		if (isCashRegisterOpen) {
			setCashRegisterData((prev: any) => ({
				...prev,
				...cashRegisterList[0],
				total_sales: totalTodaySalesAmount,
				closing_amount: prev.opening_amount + totalTodaySalesAmount,
			}));
		}
	}, [cashRegisterList, isCashRegisterOpen, totalTodaySalesAmount]);

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Apertura de Caja</h2>
				</div>
				<Dialog onOpenChange={setIsDialogOpen}>
					<DialogTrigger>
						{!isCashRegisterOpen ? (
							<Button variant="outline" size="lg">
								<Icons.plus className="mr-2 h-4 w-4" />
								Registar Apertura
							</Button>
						) : (
							<Button variant="destructive" size="lg">
								<Icons.close className="mr-2 h-4 w-4" />
								Cerrar Caja
							</Button>
						)}
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<h2 className="text-2xl font-bold tracking-tight">
								{!isCashRegisterOpen ? "Apertura de Caja" : "Cierre de Caja"}
							</h2>
						</DialogHeader>
						<DialogDescription></DialogDescription>
						<CashOpeningForm data={isCashRegisterOpen && cashRegisterData} />
					</DialogContent>
				</Dialog>
			</div>
			{severalCashRegistersQuery.isLoading && <div>Cargando...</div>}
			<div hidden={severalCashRegistersQuery.isLoading}>
				<div className={isCashRegisterOpen ? "flex flex-col gap-4" : "hidden"}>
					<div className="mt-4 bg-white rounded-md border p-4">
						{
							<div className="flex flex-col gap-2">
								<span className="text-gray-400 text-sm">Caja 1</span>
								<span className="text-gray-600 text-sm">
									Responsable: {cashRegisterData.createdBy}
								</span>
								<span className="text-gray-600 text-sm">
									Apertura:{" "}
									{cashRegisterData.created_at &&
										new Date(cashRegisterData.created_at).toUTCString()}
								</span>
							</div>
						}
					</div>
					<div>
						<div className="flex gap-4 justify-between">
							<Card className="w-1/3">
								<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
									<CardTitle className="text-sm font-medium">Saldo</CardTitle>
									{/* <Activity className="w-4 h-4 text-muted-foreground" /> */}
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										L. {cashRegisterData.opening_amount}
									</div>
									{/* <p className="text-xs text-muted-foreground">
										+201 since last hour
									</p> */}
								</CardContent>
							</Card>
							<Card className="w-1/3">
								<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
									<CardTitle className="text-sm font-medium">
										Ventas del día
									</CardTitle>
									{/* <Activity className="w-4 h-4 text-muted-foreground" /> */}
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{cashRegisterData.total_sales}
									</div>
									{/* <p className="text-xs text-muted-foreground">
										+201 since last hour
									</p> */}
								</CardContent>
							</Card>
							<Card className="w-1/3">
								<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
									<CardTitle className="text-sm font-medium">
										Total a Rendir
									</CardTitle>
									{/* <Activity className="w-4 h-4 text-muted-foreground" /> */}
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										L. {cashRegisterData.closing_amount}
									</div>
									{/* <p className="text-xs text-muted-foreground">
										+201 since last hour
									</p> */}
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
				<div>
					{cashRegisterList.length === 0 && (
						<div className="flex items-center justify-center">
							<div className="flex flex-col items-center justify-center">
								<span className="text-gray-400 mt-2">No hay cajas abiertas</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
