"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/data-table-faceted-filter";

export const {
	priorities,
	statuses,
	labels,
}: {
	priorities: { label: string; value: string; icon?: any }[];
	statuses: { label: string; value: string; icon?: any }[];
	labels: { label: string; value: string; icon?: any }[];
} = {
	priorities: [
		{
			label: "Low",
			value: "low",
		},
		{
			label: "Medium",
			value: "medium",
		},
		{
			label: "High",
			value: "high",
		},
	],
	statuses: [
		{
			label: "Open",
			value: "open",
		},
		{
			label: "In Progress",
			value: "in-progress",
		},
		{
			label: "Closed",
			value: "closed",
		},
	],
	labels: [
		{
			label: "Bug",
			value: "bug",
		},
		{
			label: "Feature",
			value: "feature",
		},
		{
			label: "Enhancement",
			value: "enhancement",
		},
		{
			label: "Documentation",
			value: "documentation",
		},
	],
};

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
	filterBy?: { [key in keyof TData]?: string };
}

export function DataTableToolbar<TData>({ table, filterBy }: DataTableToolbarProps<TData>) {
	const isFiltered =
		table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length;

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				{filterBy && (
					<Input
						placeholder={`Filtrar ${filterBy[
							Object.keys(filterBy)[0] as keyof TData
						]?.toLocaleLowerCase()}...`}
						value={
							(table
								.getColumn(Object.keys(filterBy)[0])
								?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table
								.getColumn(Object.keys(filterBy)[0])
								?.setFilterValue(event.target.value)
						}
						className="h-8 w-[150px] lg:w-[250px]"
					/>
				)}
				{/* {table.getColumn("enabled") && (
					<DataTableFacetedFilter
						column={table.getColumn("status")}
						title="Habilitado"
						options={statuses}
					/>
				)}
				{table.getColumn("verified") && (
					<DataTableFacetedFilter
						column={table.getColumn("priority")}
						title="Verificado"
						options={priorities}
					/>
				)} */}
				{isFiltered && (
					<Button
						variant="ghost"
						onClick={() => table.resetColumnFilters()}
						className="h-8 px-2 lg:px-3"
					>
						Limpiar filtros
						<X className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
