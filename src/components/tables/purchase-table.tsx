"use client";

import * as React from "react";

import { Columns } from "../../types";
import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Action } from "@/components/data-table-row-actions";
import { Purchase } from "@/lib/validations/purchase";
import { useGetSeveralPurchases } from "@/hooks/purchase/use-get-several-purchases";
import { useDeletePurchase } from "@/hooks/purchase/use-delete-purchase";

const columnsDef: Columns<Purchase>[] = [
	{
		key: "id",
		title: "ID",
	},
	{
		key: "total",
		title: "Total",
	},
];

const actions = ({ deletePurchase }: any): Action<Purchase> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este elemento?")) return;
			deletePurchase({ id: row.original.id });
		},
	},
});

export function PurchaseTable() {
	const severalPurchasesQuery = useGetSeveralPurchases();
	const deletePurchaseQuery = useDeletePurchase();

	const purchasesList = severalPurchasesQuery.data?.data?.data || [];
	const purchasesListFiltered = purchasesList?.map((purchase: any) => ({
		...purchase,
	}));
	const rowActions = actions({ deletePurchase: deletePurchaseQuery.mutate });
	const purchaseColumns = serialiseColumns<Purchase>(columnsDef, rowActions);

	return (
		<DataTable filterBy={{ id: "ID" }} columns={purchaseColumns} data={purchasesListFiltered} />
	);
}
