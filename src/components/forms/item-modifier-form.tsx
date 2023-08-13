"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { clearObject, cn } from "@/lib/utils";
import { ItemModifier, itemModifierSchema } from "@/lib/validations/item-modifier";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useCreateItemModifier } from "@/hooks/item-modifier/use-create-item-modifier";
import { useUpdateItemModifier } from "@/hooks/item-modifier/use-update-item-modifier";

interface ItemModifierFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: ItemModifier;
}

export function ItemModifierForm({ className, ...props }: ItemModifierFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createItemModifier } = useCreateItemModifier();
	const { mutate: updateItemModifier } = useUpdateItemModifier();

	const form = useForm<ItemModifier>({
		resolver: zodResolver(itemModifierSchema),
		defaultValues: props.data ?? {
			name: "",
			options: [{ name: "", price: 0 }],
		},
	});

	const fieldArray = useFieldArray({
		control: form.control,
		name: "options",
	});

	const onSubmit: SubmitHandler<ItemModifier> = (formData: ItemModifier) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateItemModifier({
				id: props.data.id,
				data: formDataFormatted,
			});
		}

		createItemModifier({ data: formDataFormatted });
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
												placeholder="e.g. Salsas"
												autoCorrect="off"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div>
								{fieldArray.fields.map((field, index) => (
									<div
										className="flex items-end gap-4 align-bottom"
										key={field.id}
									>
										<FormField
											control={form.control}
											name={`options.${index}.name`}
											render={({ field }) => (
												<FormItem>
													<FormLabel
														className={cn(index !== 0 && "sr-only")}
													>
														Nombre
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="e.g. Salsa Blanca"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`options.${index}.price`}
											render={({ field }) => (
												<FormItem>
													<FormLabel
														className={cn(index !== 0 && "sr-only")}
													>
														Precio
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															type="number"
															step=".01"
															placeholder="L 00.00"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button
											type="button"
											variant="link"
											size="sm"
											onClick={() => fieldArray.remove(index)}
										>
											Eliminar
										</Button>
									</div>
								))}
								<Button
									type="button"
									variant="link"
									size="sm"
									className="mt-1"
									onClick={() => {
										fieldArray.append({ name: "", price: 0 });
									}}
								>
									Agregar opción
								</Button>
							</div>
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
