"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import * as React from "react";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
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
import { useUpdateEmployee } from "@/hooks/employee/use-update-employee";
import { DatePicker } from "../date-picker";

const accountFormSchema = z.object({
	first_name: z.string().trim().min(2).max(50),
	// middle_name: z.string().trim().min(2).max(50).optional(),
	last_name: z.string().trim().min(2).max(50),
	birthdate: z.coerce.date(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm(props: { data?: any }) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: updateEmployee } = useUpdateEmployee();

	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues: props.data,
	});

	function onSubmit(data: AccountFormValues) {
		const formData = {
			...data,
			// birthdate: data.birthdate ? format(data.birthdate, "yyyy-MM-dd") : null,
		};

		updateEmployee({
			id: props.data?.id,
			data: formData,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex items-center gap-4">
					<FormField
						control={form.control}
						name="first_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="text"
										placeholder="e.g. Juan"
										autoCorrect="off"
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="last_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Apellido</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="text"
										placeholder="e.g. Perez"
										autoCorrect="off"
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="birthdate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fecha de cumpleaños</FormLabel>
							<FormControl>
								<DatePicker {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Actualizar datos</Button>
			</form>
		</Form>
	);
}
