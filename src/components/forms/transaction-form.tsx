"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { Transaction, transactionSchema } from "@/lib/validations/transaction";
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
import { useUpdateTransaction } from "@/hooks/transaction/use-update-transaction";
import { useCreateTransaction } from "@/hooks/transaction/use-create-transaction";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface TransactionFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Transaction;
}

const transactionListOptions: {
	label: string;
	value: "INCOME" | "EXPENSE";
}[] = [
	{ label: "Ingreso", value: "INCOME" },
	{ label: "Egreso", value: "EXPENSE" },
];
export function TransactionForm({ className, ...props }: TransactionFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createTransaction } = useCreateTransaction();
	const { mutate: updateTransaction } = useUpdateTransaction();

	const form = useForm<Transaction>({
		resolver: zodResolver(transactionSchema),
		defaultValues: props.data ?? {
			amount: 0,
			type: null,
			description: "",
		},
	});

	const onSubmit: SubmitHandler<Transaction> = (formData: Transaction) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateTransaction({ id: props.data.id, data: formDataFormatted });
		}

		createTransaction(formDataFormatted);
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
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Monto</FormLabel>
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
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo de Transacción</FormLabel>
										<FormControl>
											<Select
												value={String(field.value)}
												onValueChange={(value) => {
													form.setValue("type", value as any);
												}}
											>
												<SelectTrigger>
													<SelectValue
														placeholder={
															transactionListOptions?.find(
																(transaction) =>
																	transaction.value ===
																	field.value
															)?.label ?? "Seleccionar"
														}
													/>
												</SelectTrigger>
												<SelectContent side="top">
													{transactionListOptions?.map((transaction) => (
														<SelectItem
															key={transaction.value}
															value={transaction.value}
														>
															{transaction.label}
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
