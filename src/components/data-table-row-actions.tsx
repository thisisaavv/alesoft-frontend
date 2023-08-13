"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

interface DataTableRowActionsProps<TData> {
	row: Row<TData> | any;
	actions?: Action<TData>;
}

export interface Action<T> {
	[key: string]: {
		title: string | any;
		icon?: any;
		disabled?: boolean;
		onClick?: ({ row, slug }: { row: Row<T>; slug?: string }) => void;
	};
}

const defaultActions: Action<any> = {
	view: {
		title: "Ver detalles",
		onClick: ({ row }) => {
			const path = window.location.pathname;
			const basePath = path.split("/")[1];
			window.location.href = `/${basePath}/${row.original.id}`;
		},
	},
	separator: {
		title: "separator",
		onClick({}) {},
	},
	edit: {
		title: "Editar",
		icon: "pen",
		onClick: ({ row }) => {
			const path = window.location.pathname;
			const basePath = path.split("/")[1];
			window.location.href = `/${basePath}/${row.original.id}/edit`;
		},
	},
	delete: {
		title: "Eliminar",
		icon: "trash",
		onClick: ({ row }) => console.log(row.id),
	},
};

export function DataTableRowActions<TData>({ row, actions }: DataTableRowActionsProps<TData>) {
	const _actions = Object.entries({
		...defaultActions,
		...actions,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
					<Icons.moreHorizontal className="h-4 w-4" />
					<span className="sr-only">Mostrar acciones</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				{_actions.map(([key, value]) => {
					if (value.disabled) return null;
					// const Icon = value.icon ? Icons[value.icon] : null;
					if (key === "separator") return <DropdownMenuSeparator key={key} />;

					return (
						<DropdownMenuItem
							key={key}
							onClick={() => value?.onClick && value.onClick({ row })}
						>
							{/* <Icon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" /> */}
							{!Array.isArray(value.title)
								? value.title
								: value.title[row.original.enabled ? 1 : 0]}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
