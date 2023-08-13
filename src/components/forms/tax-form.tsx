"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { Tax, taxSchema } from "@/lib/validations/tax";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clearObject, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateTax } from "@/hooks/tax/use-update-tax";
import { useCreateTax } from "@/hooks/tax/use-create-tax";

interface TaxFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Tax;
}

export function TaxForm({ className, ...props }: TaxFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createTax } = useCreateTax();
	const { mutate: updateTax } = useUpdateTax();

	const form = useForm<Tax>({
		resolver: zodResolver(taxSchema),
		defaultValues: props.data ?? {
			name: "",
			rate: 0,
			description: "",
		},
	});

	const onSubmit: SubmitHandler<Tax> = (formData: Tax) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateTax({ id: props.data.id, data: formDataFormatted });
		}

		createTax(formDataFormatted);
		form.reset();
	};

	return (
		<div className="max-w-2xl">
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												placeholder="e.g. IVA"
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
								name="rate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Porcentaje</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="number"
												step=".01"
												placeholder="e.g. 12"
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
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descripción</FormLabel>
										<FormControl>
											<Textarea {...field} disabled={isLoading} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-4">
								<Button isLoading={isLoading}>
									{props.data ? "Actualizar" : "Registrar"}
								</Button>
								<Button
									variant="outline"
									type="reset"
									onClick={() => {
										form.setFocus("name");
										form.reset();
									}}
								>
									Cancelar
								</Button>
							</div>
						</div>
					</form>
				</div>
			</Form>
		</div>
	);
}
