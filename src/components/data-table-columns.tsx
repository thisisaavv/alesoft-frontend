"use client";

import { ColumnDef } from "@tanstack/react-table";

import { formatValue } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-row-actions";

export function serialiseColumns<T>(columns: any, actions: any): ColumnDef<T>[] {
	const _columns: ColumnDef<T>[] = [
		// {
		// 	id: "select",
		// 	header: ({ table }) => (
		// 		<Checkbox
		// 			checked={table.getIsAllPageRowsSelected()}
		// 			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
		// 			aria-label="Seleccionar todo"
		// 			className="translate-y-[2px]"
		// 		/>
		// 	),
		// 	cell: ({ row }) => (
		// 		<Checkbox
		// 			checked={row.getIsSelected()}
		// 			onCheckedChange={(value) => row.toggleSelected(!!value)}
		// 			aria-label="Seleccionar fila"
		// 			className="translate-y-[2px]"
		// 		/>
		// 	),
		// 	enableSorting: false,
		// 	enableHiding: false,
		// },
		...columns.map((_column: any) => ({
			accessorKey: _column.key,
			header: ({ column }: any) => (
				<DataTableColumnHeader column={column} title={_column.title} />
			),
			cell: ({ row }: any) => (
				<div className="min-w-[80px] text-ellipsis overflow-hidden whitespace-nowrap max-w-lg">
					{formatValue(row.getValue(_column.key))}
				</div>
			),
		})),
		{
			id: "actions",
			cell: ({ row }) => <DataTableRowActions row={row} actions={actions} />,
		},
	];

	return _columns;
}
