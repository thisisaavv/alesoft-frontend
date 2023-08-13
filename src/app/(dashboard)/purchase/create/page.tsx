import { Metadata } from "next";

import { PurchaseForm } from "@/components/forms/purchase-form";

export const metadata: Metadata = {
	title: "Crear Compra",
	description: "Crear Compra",
};

export default function PurchaseRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Nueva Orden de Compra</h2>
			</div>
			<PurchaseForm />
		</>
	);
}
