"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@/components/details-view";
import { useGetEmployee } from "@/hooks/employee/use-get-employee";

const publicHeaders = {
	id: "ID",
	first_name: "Primer nombre",
	middle_name: "Segundo nombre",
	last_name: "Apellido",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	company_id: "Empresa",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function EmployeeDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getEmployeeQuery = useGetEmployee(id);
	const { data, isLoading } = getEmployeeQuery;
	const employeeData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Empleado</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={employeeData} />}
		</>
	);
}
