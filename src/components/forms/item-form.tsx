"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Item, itemSchema } from "@/lib/validations/item";
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
import { cleanObject, clearObject, cn, formatList } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateItem } from "@/hooks/item/use-create-item";
import { useUpdateItem } from "@/hooks/item/use-update-item";
import { Combobox } from "@/components/ui/combobox";
import { useGetSeveralProviders } from "@/hooks/provider/use-get-several-providers";
import { useGetSeveralItemCategories } from "@/hooks/item-category/use-get-several-item-categories";
import { useGetSeveralDiscounts } from "@/hooks/discount/use-get-several-discounts";
import { useGetSeveralTaxes } from "@/hooks/tax/use-get-several-taxes";

interface ItemFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Item;
}

export function ItemForm({ className, ...props }: ItemFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createItem } = useCreateItem();
	const { mutate: updateItem } = useUpdateItem();
	const { data: severalProviders } = useGetSeveralProviders();
	const { data: severalItemCategories } = useGetSeveralItemCategories();
	const { data: severalDiscounts } = useGetSeveralDiscounts();
	const { data: severalTaxes } = useGetSeveralTaxes();

	const providersList = severalProviders?.data?.data || [];
	const providersListOptions = formatList(providersList, "name", "id");
	const itemCategoriesList = severalItemCategories?.data?.data || [];
	const itemCategoriesListOptions = formatList(itemCategoriesList, "name", "id");
	const discountsList = severalDiscounts?.data?.data || [];
	const discountsListOptions = formatList(discountsList, "name", "id");
	const taxesList = severalTaxes?.data?.data || [];
	const taxesListOptions = formatList(taxesList, "name", "id");

	const form = useForm<Item>({
		resolver: zodResolver(itemSchema),
		defaultValues: props.data ?? {
			name: "",
			description: "",
			price: 0,
			quantity: 0,
			inventory_id: "7d92a13b-b7f9-42f7-8661-691ad43ee3ca",
		},
	});

	const onSubmit: SubmitHandler<Item> = (formData: Item) => {
		const formDataFormatted = cleanObject(formData);

		if (props.data) {
			return updateItem({
				id: props.data.id!,
				data: formDataFormatted,
			});
		}

		createItem({ data: formDataFormatted });
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
												placeholder="e.g. Coca Cola"
												autoCorrect="off"
												disabled={isLoading}
												autoFocus
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center gap-4">
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Precio</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="number"
													step=".01"
													placeholder="e.g. 10.00"
													min={0}
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
									name="quantity"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cantidad disponible</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="number"
													min={0}
													placeholder="e.g. 100"
													autoCapitalize="none"
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
							<FormField
								control={form.control}
								name="provider_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Proveedor</FormLabel>
										<FormControl>
											<Combobox
												{...field}
												form={form}
												data={providersListOptions}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tax_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Impuesto</FormLabel>
										<FormControl>
											<Combobox
												{...field}
												form={form}
												data={taxesListOptions}
											/>
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
