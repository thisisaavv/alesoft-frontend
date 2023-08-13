"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetTransaction } from "@/hooks/transaction/use-get-transaction";

const publicHeaders = {
	id: "ID",
	amount: "Monto",
	type: "Tipo",
	description: "Descripción",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function TransactionDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getTransactionQuery = useGetTransaction(id);
	const { data, isLoading } = getTransactionQuery;
	const transactionData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Detalles de Transacción</h2>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={transactionData} />}
		</>
	);
}
