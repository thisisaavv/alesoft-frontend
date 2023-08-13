"use client";

import { DialogProps } from "@radix-ui/react-alert-dialog";
import { Circle, File, Laptop, Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { docsConfig } from "@/config/docs";
import { dashboardConfig } from "@/config/dashboard";

export function CommandMenu({ ...props }: DialogProps) {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const { setTheme } = useTheme();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = React.useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	return (
		<>
			<Button
				variant="outline"
				className={cn(
					"relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
				)}
				onClick={() => setOpen(true)}
				{...props}
			>
				<span className="hidden lg:inline-flex">Buscar...</span>
				<span className="inline-flex lg:hidden">Buscar...</span>
				<kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
					<span className="text-xs">CTRL</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Escribe un comando o busca..." />
				<CommandList>
					<CommandEmpty>No se encontraron resultados.</CommandEmpty>
					<CommandGroup heading="Links">
						{dashboardConfig.mainNav
							.filter((navitem: any) => !navitem.external)
							.map((navItem) => (
								<CommandItem
									key={navItem.href}
									value={navItem.title}
									onSelect={() => {
										runCommand(() => router.push(navItem.href as string));
									}}
								>
									<File className="w-4 h-4 mr-2" />
									{navItem.title}
								</CommandItem>
							))}
						{dashboardConfig.sidebarNav.map((group) => (
							<CommandGroup key={group.title} heading={group.title}>
								{group.items?.map((navItem) => (
									<CommandItem
										key={navItem.href}
										value={navItem.title}
										onSelect={() => {
											runCommand(() => router.push(navItem.href as string));
										}}
									>
										<div className="flex items-center justify-center w-4 h-4 mr-2">
											<Circle className="w-3 h-3" />
										</div>
										{navItem.title}
									</CommandItem>
								))}
							</CommandGroup>
						))}
					</CommandGroup>
					{/* <CommandGroup heading="Links">
						{docsConfig.mainNav
							.filter((navitem: any) => !navitem.external)
							.map((navItem) => (
								<CommandItem
									key={navItem.href}
									value={navItem.title}
									onSelect={() => {
										runCommand(() => router.push(navItem.href as string));
									}}
								>
									<File className="w-4 h-4 mr-2" />
									{navItem.title}
								</CommandItem>
							))}
					</CommandGroup>
					{docsConfig.sidebarNav.map((group) => (
						<CommandGroup key={group.title} heading={group.title}>
							{group.items?.map((navItem) => (
								<CommandItem
									key={navItem.href}
									value={navItem.title}
									onSelect={() => {
										runCommand(() => router.push(navItem.href as string));
									}}
								>
									<div className="flex items-center justify-center w-4 h-4 mr-2">
										<Circle className="w-3 h-3" />
									</div>
									{navItem.title}
								</CommandItem>
							))}
						</CommandGroup>
					))} */}
					<CommandSeparator />
					<CommandGroup heading="Theme">
						<CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
							<SunMedium className="w-4 h-4 mr-2" />
							Claro
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
							<Moon className="w-4 h-4 mr-2" />
							Oscuro
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
							<Laptop className="w-4 h-4 mr-2" />
							Sistema
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
