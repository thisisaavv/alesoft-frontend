import { Metadata } from "next";
import { CustomerForm } from "@/components/forms/customer-form";

export const metadata: Metadata = {
	title: "Crear Cliente",
	description: "Crear Cliente",
};

export default function CustomerRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Cliente</h2>
				</div>
			</div>
			<CustomerForm />
		</>
	);
}
