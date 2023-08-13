import { Metadata } from "next";
import { DiscountForm } from "@/components/forms/discount-form";

export const metadata: Metadata = {
	title: "Crear Descuento",
	description: "Crear Descuento",
};

export default function DiscountRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Descuento</h2>
				</div>
			</div>
			<DiscountForm />
		</>
	);
}
