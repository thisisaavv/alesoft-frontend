import { Metadata } from "next";

import { PurchaseForm } from "@/components/forms/purchase-form";
import { TransactionForm } from "@/components/forms/transaction-form";

export const metadata: Metadata = {
	title: "Crear Transacción",
	description: "Crear Transacción",
};

export default function TransactionRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Registrar Transacción</h2>
			</div>
			<TransactionForm />
		</>
	);
}
