import { Metadata } from "next";

import { ProviderForm } from "@/components/forms/provider-form";
import ButtonBack from "@/components/button-back";

export const metadata: Metadata = {
	title: "Crear Proveedor",
	description: "Crear Proveedor",
};

export default function ProviderRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div className="flex items-center space-x-2">
					<ButtonBack position="relative" />
					<h2 className="text-2xl font-bold tracking-tight">Crear Proveedor</h2>
				</div>
			</div>
			<ProviderForm />
		</>
	);
}
