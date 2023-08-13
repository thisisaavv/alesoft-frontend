import { Metadata } from "next";

import { CompanyForm } from "@/components/forms/company-form";

export const metadata: Metadata = {
	title: "Crear Empresa",
	description: "Crear Empresa",
};

export default function CompanyRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Crear Empresa</h2>
			</div>
			<CompanyForm />
		</>
	);
}
