"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as React from "react";

import { Purchase, purchaseSchema } from "@/lib/validations/purchase";
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
import { clearObject, cn, formatCurrency, formatList } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUpdatePurchase } from "@/hooks/purchase/use-update-purchase";
import { useCreatePurchase } from "@/hooks/purchase/use-create-purchase";
import { Combobox } from "../ui/combobox";
import { useGetSeveralProviders } from "@/hooks/provider/use-get-several-providers";
import { DatePicker } from "../date-picker";
import { useGetSeveralItems } from "@/hooks/item/use-get-several-items";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

interface PurchaseFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Purchase;
}

export function PurchaseForm({ className, ...props }: PurchaseFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [focus, setFocus] = React.useState<boolean>(false);
	const [itemTotal, setItemTotal] = React.useState<number>(0);
	const { mutate: createPurchase } = useCreatePurchase();
	const { mutate: updatePurchase } = useUpdatePurchase();
	const { data: severalProviders } = useGetSeveralProviders();
	const { data: severalItems } = useGetSeveralItems();

	const providersList = severalProviders?.data?.data || [];
	const providersListOptions = formatList(providersList, "name", "id");
	const itemsList = severalItems?.data?.data || [];
	const itemsListOptions = itemsList.map((item: any) => ({
		label: item.name,
		value: item.id,
		price: item.price,
		quantity: item.quantity,
	}));

	const form = useForm<Purchase>({
		resolver: zodResolver(purchaseSchema),
		defaultValues: props.data ?? {
			purchase_items: [],
			note: "",
			total: 0,
			subtotal: 0,
			expected_date: new Date(),
		},
	});

	console.log(form.watch("purchase_items"));

	const purchaseItemsFieldsArray = useFieldArray({
		name: "purchase_items",
		control: form.control,
	});

	const findLabel = (id: string) => {
		const item = itemsListOptions.find((item: any) => item.value === id);
		return item?.label;
	};

	const onSubmit: SubmitHandler<Purchase> = (formData: Purchase) => {
		const formDataFormatted = clearObject(formData);
		console.log(formDataFormatted);

		if (props.data) {
			return updatePurchase({ id: props.data.id, data: formDataFormatted });
		}

		createPurchase(formDataFormatted);
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
								name="expected_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fecha de recibimiento</FormLabel>
										<FormControl>
											<DatePicker {...field} />
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
										<FormLabel>Nota</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												placeholder="Agregar nota"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid gap-4 mt-4">
								<h2 className="text-lg font-bold tracking-tight">
									Información de Productos
								</h2>
								<Table>
									{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
									<TableHeader>
										<TableRow>
											<TableHead>Producto</TableHead>
											<TableHead className="w-[120px]">Cantidad</TableHead>
											<TableHead className="w-[120px]">
												Costo de Unidad
											</TableHead>
											<TableHead>Monto Total</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{purchaseItemsFieldsArray.fields.map((item, index) => (
											<TableRow key={item.id}>
												<TableCell>{findLabel(item.item_id)}</TableCell>
												<TableCell>
													<FormField
														control={form.control}
														name={`purchase_items.${index}.quantity`}
														render={({ field }) => (
															<FormItem>
																<FormControl>
																	<Input
																		{...field}
																		type="number"
																		min={0}
																		disabled={isLoading}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</TableCell>
												<TableCell>
													<FormField
														control={form.control}
														name={`purchase_items.${index}.price`}
														render={({ field }) => (
															<FormItem>
																<FormControl>
																	<Input
																		{...field}
																		type="number"
																		step=".01"
																		min={0}
																		disabled={isLoading}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</TableCell>
												<TableCell>
													{formatCurrency(
														form.getValues(
															`purchase_items.${index}.total`
														) || 0
													)}
													<FormField
														control={form.control}
														name={`purchase_items.${index}.total`}
														render={({ field }) => (
															<FormItem hidden>
																<FormControl>
																	<Input
																		{...field}
																		value={
																			item.quantity *
																			item.price
																		}
																		type="number"
																		step=".01"
																		min={0}
																		disabled={true}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</TableCell>
												<Button
													type="button"
													variant="link"
													size="sm"
													onClick={() =>
														purchaseItemsFieldsArray.remove(index)
													}
												>
													Eliminar
												</Button>
											</TableRow>
										))}
									</TableBody>
								</Table>

								<Command className="relative overflow-auto">
									<Popover open={focus} onOpenChange={setFocus}>
										<PopoverTrigger asChild>
											<CommandInput placeholder="Buscar un elemento..." />
										</PopoverTrigger>
										<PopoverContent className="p-0 w-full relative">
											<CommandEmpty>
												No se encontran elementos.
												<br />
											</CommandEmpty>
											<CommandGroup className="w-full">
												{itemsListOptions?.map((item: any) => (
													<CommandItem
														{...props}
														value={item.value}
														key={item.value}
														onSelect={(currentValue) => {
															purchaseItemsFieldsArray.append({
																item_id: currentValue,
																quantity: 0,
																price: 0,
															});
														}}
													>
														{item.label}
													</CommandItem>
												))}
											</CommandGroup>
										</PopoverContent>
									</Popover>
								</Command>
							</div>
							<div className="flex gap-4">
								<Button isLoading={isLoading}>
									{props.data ? "Actualizar" : "Registrar"}
								</Button>
								<Button variant="outline" type="reset" onClick={() => form.reset()}>
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
