"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { CashRegister } from "@/lib/validations/cash-register";
import { Action } from "@/components/data-table-row-actions";
import { useGetSeveralCashRegisters } from "@/hooks/cash-register/use-get-several-cash-registers";
import { useDeleteCashRegister } from "@/hooks/cash-register/use-delete-cash-register";

const columnsDef: Columns<CashRegister>[] = [
	{
		key: "created_at",
		title: "Fecha de apertura",
	},
	{
		key: "created_by",
		title: "Creado por",
	},
];

const actions = ({ deleteCashRegister }: { deleteCashRegister: any }): Action<CashRegister> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este registro?")) return;
			deleteCashRegister({ id: row.original.id });
		},
	},
});

export function CashRegisterTable() {
	const severalCashRegisterQuery = useGetSeveralCashRegisters();
	const deleteCashRegisterQuery = useDeleteCashRegister();

	const cashRegisterList = severalCashRegisterQuery.data?.data?.data || [];
	const cashRegisterListFiltered = cashRegisterList?.map((tax: any) => ({
		...tax,
	}));
	const rowActions = actions({ deleteCashRegister: deleteCashRegisterQuery.mutate });
	const cashRegisterColumns = serialiseColumns<CashRegister>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ created_at: "Fecha de creación" }}
			columns={cashRegisterColumns}
			data={cashRegisterListFiltered}
		/>
	);
}
