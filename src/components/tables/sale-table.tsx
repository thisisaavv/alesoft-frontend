"use client";

import * as React from "react";

import { Columns } from "../../types";
import { Sale } from "@/lib/validations/sale";
import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { useDeleteSale } from "@/hooks/sale/use-delete-sale";
import { useGetSeveralSales } from "@/hooks/sale/use-get-several-sales";
import { Action } from "@/components/data-table-row-actions";
import { useGetSeveralCustomers } from "@/hooks/customer/use-get-several-customers";
import { useGetSeveralDiscounts } from "@/hooks/discount/use-get-several-discounts";

const columnsDef: Columns<Sale>[] = [
	{
		key: "id",
		title: "ID de venta",
	},
	{
		key: "created_at",
		title: "Fecha de creación",
	},
	{
		key: "customer_name" as any,
		title: "Cliente",
	},
	{
		key: "discount_amount" as any,
		title: "Descuento",
	},
	{
		key: "total",
		title: "Total",
	},
];

const actions = ({ deleteSale }: { deleteSale: any }): Action<Sale> => {
	return {
		delete: {
			title: "Eliminar",
			onClick: ({ row }) => {
				if (!confirm("¿Está seguro de que desea eliminar esta venta?")) return;
				deleteSale({ id: row.original.id });
			},
		},
	};
};

export function SaleTable() {
	const severalSalesQuery = useGetSeveralSales();
	const deleteSaleQuery = useDeleteSale();
	const severalCustomersQuery = useGetSeveralCustomers();
	const severalDiscountQuery = useGetSeveralDiscounts();

	const discountList = severalDiscountQuery.data?.data?.data || [];
	const customersList = severalCustomersQuery.data?.data?.data || [];
	const customersListOptions = customersList.map((customer: any) => ({
		value: customer.id,
		label: `${customer.first_name} ${customer.last_name}`,
	}));
	const salesList = severalSalesQuery.data?.data?.data || [];
	const salesListFiltered = salesList.map((sale: any) => ({
		...sale,
		customer_name:
			customersListOptions.find((customer: any) => customer.value === sale.customer_id)
				?.label || null,
		discount_amount:
			discountList.find((discount: any) => discount.id === sale.discount_id)?.amount || 0,
	}));
	const rowActions = actions({ deleteSale: deleteSaleQuery.mutate });
	const columns = serialiseColumns<Sale>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ customer_name: "Cliente" }}
			columns={columns}
			data={salesListFiltered}
		/>
	);
}
