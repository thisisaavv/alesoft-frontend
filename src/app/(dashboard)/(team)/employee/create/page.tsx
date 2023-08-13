import { Metadata } from "next";
import { EmployeeForm } from "@/components/forms/employee-form";

export const metadata: Metadata = {
	title: "Crear Empleado",
	description: "Crear Empleado",
};

export default function EmployeeRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Empleado</h2>
				</div>
			</div>
			<EmployeeForm />
		</>
	);
}
