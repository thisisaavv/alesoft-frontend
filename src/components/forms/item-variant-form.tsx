"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { clearObject, cn } from "@/lib/utils";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ItemVariant, itemVariantSchema } from "@/lib/validations/item-variant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateItemVariant } from "@/hooks/item-variant/use-create-item-variant";
import { useUpdateItemVariant } from "@/hooks/item-variant/use-update-item-variant";

interface ItemVariantFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: ItemVariant;
}

export function ItemVariantForm({ className, ...props }: ItemVariantFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createItemVariant } = useCreateItemVariant();
	const { mutate: updateItemVariant } = useUpdateItemVariant();

	const form = useForm<ItemVariant>({
		resolver: zodResolver(itemVariantSchema),
		defaultValues: props.data ?? {
			name: "",
			options: [],
		},
	});

	const fieldArray = useFieldArray({
		control: form.control,
		name: "options",
	});

	const onSubmit: SubmitHandler<ItemVariant> = (formData: ItemVariant) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateItemVariant({
				id: props.data.id,
				data: formDataFormatted,
			});
		}

		createItemVariant({ data: formDataFormatted });
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
												placeholder="e.g. Bebidas"
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
									<FormField
										control={form.control}
										key={field.id}
										name={`options.${index}`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className={cn(index !== 0 && "sr-only")}>
													Opciones
												</FormLabel>
												<FormControl>
													<div className="flex items-center align-middle">
														<Input {...field} />
														<Button
															type="button"
															variant="link"
															size="sm"
															onClick={() => fieldArray.remove(index)}
														>
															Eliminar
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
								<Button
									type="button"
									variant="link"
									size="sm"
									className="mt-1"
									onClick={() => {
										form.setFocus(
											`options.${form.getValues("options").length - 1}}`
										);
										fieldArray.append("");
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
