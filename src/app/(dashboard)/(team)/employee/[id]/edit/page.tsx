"use client";

import { useParams } from "next/navigation";
import { EmployeeForm } from "@/components/forms/employee-form";
import { useGetEmployee } from "@/hooks/employee/use-get-employee";

export default function EmployeeEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getEmployeeQuery = useGetEmployee(id);
	const { data, isLoading, isError, error } = getEmployeeQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Modificar Empleado</h2>
				</div>
				{/* <div className="flex items-center space-x-2">Acciones</div> */}
			</div>
			<EmployeeForm data={data.data} />
		</>
	);
}
