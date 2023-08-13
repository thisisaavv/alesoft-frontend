import { Metadata } from "next";

import { ParameterForm } from "@/components/forms/parameter-form";

export const metadata: Metadata = {
	title: "Crear Parámetro",
	description: "Crear Parámetro",
};

export default function ParameterRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Crear Parámetro</h2>
			</div>
			<ParameterForm />
		</>
	);
}
