"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@/components/details-view";
import { useGetCashRegister } from "@/hooks/cash-register/use-get-cash-register";

const publicHeaders = {
	id: "ID",
	note: "Nota",
};

const protectedHeaders = {
	created_at: "Fecha de venta",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function CashRegisterDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getCashRegisterQuery = useGetCashRegister(id);
	const { data, isLoading } = getCashRegisterQuery;
	const cashRegisterData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Detalles de Apertura de Caja
					</h2>
				</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={cashRegisterData} />}
		</>
	);
}
