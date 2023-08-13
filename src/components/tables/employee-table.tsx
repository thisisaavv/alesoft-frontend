"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { useGetSeveralEmployees } from "@/hooks/employee/use-get-several-employees";
import { useDeleteEmployee } from "@/hooks/employee/use-delete-employee";
import { Employee } from "@/lib/validations/employee";
import { Action } from "@/components/data-table-row-actions";

const columnsDef: Columns<Employee>[] = [
	{
		key: "employee_name" as any,
		title: "Nombre completo",
	},
	{
		key: "emails",
		title: "Correo electrónico",
	},
	{
		key: "phones",
		title: "Teléfono",
	},
];

const actions = ({ deleteEmployee }: any): Action<Employee> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este empleado?")) return;
			deleteEmployee({ id: row.original.id });
		},
	},
});

export function EmployeeTable() {
	const severalEmployeesQuery = useGetSeveralEmployees();
	const deleteEmployeeQuery = useDeleteEmployee();

	const employeesList = severalEmployeesQuery.data?.data?.data || [];
	const employeesListFiltered = employeesList?.map((employee: any) => ({
		...employee,
		employee_name:
			employee?.first_name +
			(employee.middle_name ? " " + employee?.middle_name + " " : " ") +
			employee?.last_name,
	}));
	const rowActions = actions({ deleteEmployee: deleteEmployeeQuery.mutate });
	const employeeColumns = serialiseColumns<Employee>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ employee_name: "Nombre completo" }}
			columns={employeeColumns}
			data={employeesListFiltered}
		/>
	);
}
