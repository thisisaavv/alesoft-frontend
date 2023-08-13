import { Metadata } from "next";
import { TaxForm } from "@/components/forms/tax-form";

export const metadata: Metadata = {
	title: "Crear Impuesto",
	description: "Crear Impuesto",
};

export default function InventoryRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Impuesto</h2>
				</div>
			</div>
			<TaxForm />
		</>
	);
}
