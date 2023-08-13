"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" className="px-0 w-9">
					<Icons.sun className="transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
					<Icons.moon className="absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<Icons.sun className="w-4 h-4 mr-2" />
					<span>Claro</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<Icons.moon className="w-4 h-4 mr-2" />
					<span>Oscuro</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<Icons.laptop className="w-4 h-4 mr-2" />
					<span>Sistema</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
