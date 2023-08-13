"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: { value: string; label: string }[];
	form?: any;
	name: string;
	value?: string | null;
	onChange?: any;
	notFoundAction?: React.ReactNode;
}

export function Combobox(props: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const items = props.data || [];

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{props.value
						? items.find((item) => item.value === props.value)?.label
						: "Seleccione un elemento..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px] p-0">
				<Command>
					<CommandInput placeholder="Buscar un elemento..." />
					<CommandEmpty>
						No se encontran elementos.
						<br />
						{props.notFoundAction}
					</CommandEmpty>
					<CommandGroup>
						{items.map((item) => (
							<CommandItem
								{...props}
								value={item.value}
								key={item.value}
								onSelect={(currentValue) => {
									props.form.setValue(props.name, currentValue);
									setOpen(false);
								}}
							>
								<Check
									onClick={() => {
										console.log("click");
									}}
									key={item.value}
									className={cn(
										"mr-2 h-4 w-4",
										props.value === item.value ? "opacity-100" : "opacity-0"
									)}
								/>
								{item.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
