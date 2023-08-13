"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { Invoice } from "@/lib/validations/invoice";
import { Action } from "@/components/data-table-row-actions";
import { useGetSeveralInvoices } from "@/hooks/invoice/use-get-several-invoices";
import { useDeleteInvoice } from "@/hooks/invoice/use-delete-invoice";

const columnsDef: Columns<Invoice>[] = [
	{
		key: "cai_number",
		title: "CAI",
	},
	{
		key: "file_url",
		title: "Archivo",
	},
];

const actions = ({ deleteInvoice }: any): Action<Invoice> => ({
	view: {
		title: "Ver detalles",
		onClick: ({ row }) => {
			const basePath = window.location.pathname;
			window.location.href = `/report/invoices/${row.original.id}`;
		},
	},
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar esta factura?")) return;
			deleteInvoice({ id: row.original.id });
		},
	},
});

export function InvoiceTable() {
	const severalInvoicesQuery = useGetSeveralInvoices();
	const deleteInvoiceQuery = useDeleteInvoice();

	const invoicesList = severalInvoicesQuery.data?.data?.data || [];
	const invoicesListFiltered = invoicesList?.map((invoice: any) => ({
		...invoice,
	}));
	const rowActions = actions({ deleteItemCategory: deleteInvoiceQuery.mutate });
	const invoiceColumns = serialiseColumns<Invoice>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ cai_number: "Nombre" }}
			columns={invoiceColumns}
			data={invoicesListFiltered}
		/>
	);
}
