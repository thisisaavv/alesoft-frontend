"use client";

import * as React from "react";

import { Columns } from "../../types";
import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Action } from "@/components/data-table-row-actions";
import { Transaction } from "@/lib/validations/transaction";
import { useGetSeveralTransactions } from "@/hooks/transaction/use-get-several-transactions";
import { useDeleteTransaction } from "@/hooks/transaction/use-delete-transaction";

const columnsDef: Columns<Transaction>[] = [
	{
		key: "created_at",
		title: "Fecha",
	},
	{
		key: "type",
		title: "Tipo",
	},
	{
		key: "amount",
		title: "Monto",
	},
	{
		key: "sub_type",
		title: "Sub Tipo",
	},
	{
		key: "description",
		title: "Descripción",
	},
];

const actions = ({ deleteTransaction }: any): Action<Transaction> => ({
	delete: {
		title: "Eliminar",
		// disabled: true,
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este elemento?")) return;
			deleteTransaction({ id: row.original.id });
		},
	},
	edit: {
		title: "Editar",
		disabled: true,
	},
});

export function TransactionTable() {
	const severalTransactionsQuery = useGetSeveralTransactions();
	const deleteTransactionQuery = useDeleteTransaction();

	const transactionsList = severalTransactionsQuery.data?.data?.data || [];
	const transactionsListFiltered = transactionsList?.map((transaction: any) => ({
		...transaction,
		created_at: transaction.created_at
			? new Date(transaction.created_at).toLocaleDateString("en-ES", {
					hour: "2-digit",
					minute: "2-digit",
			  })
			: "",
		type: transaction.type === "INCOME" ? "Ingreso" : "Egreso",
	}));
	const rowActions = actions({ deleteTransaction: deleteTransactionQuery.mutate });
	const transactionColumns = serialiseColumns<Transaction>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ sub_type: "Sub Tipo" }}
			columns={transactionColumns}
			data={transactionsListFiltered}
		/>
	);
}
