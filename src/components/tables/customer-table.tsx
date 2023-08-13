"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { Customer } from "@/lib/validations/customer";
import { Action } from "@/components/data-table-row-actions";
import { useGetSeveralCustomers } from "@/hooks/customer/use-get-several-customers";
import { useDeleteCustomer } from "@/hooks/customer/use-delete-customer";

const columnsDef: Columns<Customer>[] = [
	{
		key: "customer_name" as any,
		title: "Nombre completo",
	},
	{
		key: "rtn",
		title: "RTN",
	},
	{
		key: "emails",
		title: "Correo electrónico",
	},
	{
		key: "phones",
		title: "Teléfono",
	},
	{
		key: "city",
		title: "Ciudad",
	},
	{
		key: "street",
		title: "Dirección",
	},
];

const actions = ({ deleteCustomer }: { deleteCustomer: any }): Action<Customer> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este cliente?")) return;
			deleteCustomer({ id: row.original.id });
		},
	},
});

export function CustomerTable() {
	const severalCustomersQuery = useGetSeveralCustomers();
	const deleteCustomerQuery = useDeleteCustomer();

	const CustomersList = severalCustomersQuery.data?.data?.data || [];
	const customersListFiltered = CustomersList?.map((Customer: any) => ({
		...Customer,
		customer_name:
			Customer?.first_name +
			(Customer.middle_name ? " " + Customer?.middle_name + " " : " ") +
			Customer?.last_name,
	}));
	const rowActions = actions({ deleteCustomer: deleteCustomerQuery.mutate });
	const customerColumns = serialiseColumns<Customer>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ customer_name: "Nombre completo" }}
			columns={customerColumns}
			data={customersListFiltered}
		/>
	);
}
