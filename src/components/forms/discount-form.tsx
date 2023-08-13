"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { Discount, discountSchema } from "@/lib/validations/discount";
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
import { Icons } from "@/components/icons";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateDiscount } from "@/hooks/discount/use-update-discount";
import { useCreateDiscount } from "@/hooks/discount/use-create-discount";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface EmployeeFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Discount;
}

const amountTypeListOptions: {
	label: string;
	value: "PERCENTAGE" | "FIXED";
}[] = [
	{ label: "Porcentaje", value: "PERCENTAGE" },
	{ label: "Fijo", value: "FIXED" },
];

export function DiscountForm({ className, ...props }: EmployeeFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createDiscount } = useCreateDiscount();
	const { mutate: updateDiscount } = useUpdateDiscount();

	const form = useForm<Discount>({
		resolver: zodResolver(discountSchema),
		defaultValues: props.data ?? {
			name: "",
			note: "",
			amount_type: null,
			amount: 0,
		},
	});

	const onSubmit: SubmitHandler<Discount> = (formData: Discount) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateDiscount({ id: props.data.id, data: formDataFormatted });
		}

		createDiscount({ data: formDataFormatted });
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
												placeholder="e.g. 12% de descuento"
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
								name="amount_type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo de monto</FormLabel>
										<FormControl>
											<Select
												value={field.value || undefined}
												onValueChange={(value) => {
													form.setValue("amount_type", value as any);
												}}
											>
												<SelectTrigger>
													<SelectValue
														placeholder={
															amountTypeListOptions?.find(
																(type) => type.value === field.value
															)?.label ?? "Seleccionar"
														}
													/>
												</SelectTrigger>
												<SelectContent side="top">
													{amountTypeListOptions?.map((type) => (
														<SelectItem
															key={type.value}
															value={type.value}
														>
															{type.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Porcentaje</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												placeholder="e.g. 12%"
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
								name="note"
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
