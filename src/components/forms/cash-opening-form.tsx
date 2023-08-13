"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { CashRegister, cashRegisterSchema } from "@/lib/validations/cash-register";
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
import { useCreateCashRegister } from "@/hooks/cash-register/use-create-cash-register";
import { useUpdateCashRegister } from "@/hooks/cash-register/use-update-cash-register";
import { Textarea } from "../ui/textarea";

interface CashOpeningFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: CashRegister;
}

export function CashOpeningForm({ className, ...props }: CashOpeningFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createCashOpening } = useCreateCashRegister();
	const { mutate: updateCashOpening } = useUpdateCashRegister();

	const form = useForm<CashRegister>({
		resolver: zodResolver(cashRegisterSchema),
		defaultValues: props.data ?? {
			opening_amount: 0,
		},
	});

	const onSubmit: SubmitHandler<CashRegister> = (formData: CashRegister) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateCashOpening(
				{ id: props.data.id, data: formDataFormatted },
				{
					onSuccess(data, variables, context) {
						if (data.status === 200) {
							alert("Caja cerrada exitosamente");
							window.location.reload();
						}
					},
				}
			);
		}

		createCashOpening(formDataFormatted, {
			onSuccess(data, variables, context) {
				if (data.status === 201) {
					window.location.reload();
				}
			},
		});
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
								name="opening_amount"
								render={({ field }) => (
									<FormItem hidden={!!props.data}>
										<FormLabel>Saldo Inicial</FormLabel>
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
								name="note"
								render={({ field }) => (
									<FormItem hidden={!props.data}>
										<FormLabel>Nota</FormLabel>
										<FormControl>
											<Textarea {...field} disabled={isLoading} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-4">
								<Button isLoading={isLoading}>
									{props.data ? "Cerrar caja" : "Registrar"}
								</Button>
							</div>
						</div>
					</form>
				</div>
			</Form>
		</div>
	);
}
