"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker(props: any) {
	const dateFormatted = new Date(props.value);

	return (
		<div>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						className={cn(
							"w-full pl-3 text-left font-normal",
							!props.value && "text-muted-foreground"
						)}
						disabled={props.disabled}
					>
						{props.value ? (
							format(dateFormatted, "PPP")
						) : (
							<span>Seleccionar fecha</span>
						)}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={dateFormatted}
						onSelect={props.onChange}
						// disabled={(date: any) => date > new Date() || date < new Date("1900-01-01")}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
