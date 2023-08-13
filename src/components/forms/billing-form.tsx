"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/date-picker";
import { Switch } from "@/components/ui/switch";
import { useUpdateInvoiceLote } from "@/hooks/invoice-lote/use-update-invoice-lote";
import { Label } from "../ui/label";

const invoiceLoteFormSchema = z.object({
	enabled: z.boolean(),
	cai: z.string().min(1).max(255),
	start_date: z.coerce.date(),
	end_date: z.coerce.date(),
	start_range: z.string().min(1),
	end_range: z.string().min(1),
	current: z.string().optional(),
});

type InvoiceLote = z.infer<typeof invoiceLoteFormSchema>;

export function BillingForm(props: { data?: any }) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: updateInvoiceLote } = useUpdateInvoiceLote();

	const form = useForm<InvoiceLote>({
		resolver: zodResolver(invoiceLoteFormSchema),
		defaultValues: props.data,
	});

	function onSubmit(data: InvoiceLote) {
		updateInvoiceLote({
			id: props.data.id,
			data,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="enabled"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-2">
							<FormLabel>Habilitar Facturación CAI</FormLabel>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
									aria-readonly
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center gap-4">
					<div>
						<Label>Actual</Label>
						<br />
						<span>{form.getValues("current")}</span>
					</div>
					<div>
						<Label>Restantes</Label>
						<br />
						<span>
							{Number(form.getValues("end_range")?.split("-")[3]) -
								Number(form.getValues("current")?.split("-")[3])}
						</span>
					</div>
				</div>
				<FormField
					control={form.control}
					name="cai"
					render={({ field }) => (
						<FormItem>
							<FormLabel>CAI (Clave de Autorización de Impresión)</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
									// placeholder=""
									autoCorrect="off"
									disabled={!form.watch("enabled")}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center gap-4">
					<FormField
						control={form.control}
						name="start_date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fecha inicial</FormLabel>
								<FormControl>
									<DatePicker {...field} disabled={!form.watch("enabled")} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="end_date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fecha final</FormLabel>
								<FormControl>
									<DatePicker {...field} disabled={!form.watch("enabled")} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex items-center gap-4">
					<FormField
						control={form.control}
						name="start_range"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rango inicial</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="text"
										placeholder="e.g. 000-000-00-00000000"
										autoCorrect="off"
										disabled={!form.watch("enabled")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="end_range"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rango final</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="text"
										placeholder="e.g. 000-000-00-00000000"
										autoCorrect="off"
										disabled={!form.watch("enabled")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Actualizar facturación</Button>
			</form>
		</Form>
	);
}
