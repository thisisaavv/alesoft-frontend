"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import * as React from "react";

import { Sale, saleSchema } from "@/lib/validations/sale";
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
import { Textarea } from "@/components/ui/textarea";
import { useGetSeveralItems } from "@/hooks/item/use-get-several-items";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { useGetSeveralCustomers } from "@/hooks/customer/use-get-several-customers";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { useGetSeveralDiscounts } from "@/hooks/discount/use-get-several-discounts";
import { useCreateSale } from "@/hooks/sale/use-create-sale";
import { useGetSeveralTaxes } from "@/hooks/tax/use-get-several-taxes";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { CustomerForm } from "@/components/forms/customer-form";
import { Select } from "../ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface VirtualTerminalFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CustomerDialogForm({ className, ...props }: VirtualTerminalFormProps) {
	return (
		<Dialog>
			<DialogTrigger className="font-semibold">Crear Cliente</DialogTrigger>
			<DialogContent>
				<AlertDialogHeader>
					<DialogTitle>Registrar Cliente</DialogTitle>
					<DialogDescription>
						Complete los campos para registrar un nuevo cliente.
					</DialogDescription>
				</AlertDialogHeader>
				<CustomerForm />
			</DialogContent>
		</Dialog>
	);
}

export function VirtualRetailTerminalForm({ className, ...props }: VirtualTerminalFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [focus, setFocus] = React.useState<boolean>(false);
	const { mutate: createSale } = useCreateSale();

	const severalCustomersQuery = useGetSeveralCustomers();
	const customersList = severalCustomersQuery.data?.data?.data || [];
	const customersListOptions = customersList.map((customer: any) => ({
		value: customer.id,
		label:
			customer.first_name +
			" " +
			customer.last_name +
			" - " +
			(customer.id_card ?? customer.rtn),
	}));

	const severalItemsQuery = useGetSeveralItems();
	const itemsList = severalItemsQuery.data?.data?.data || [];
	const itemsListOptions = itemsList.map((item: any) => ({
		label: item.name,
		value: item.id,
		price: item.price,
		quantity: item.quantity,
	}));

	const severalTaxesQuery = useGetSeveralTaxes();
	const taxesList = severalTaxesQuery.data?.data?.data || [];
	const taxesListOptions = formatList(taxesList, "name", "id");

	const severalDiscountsQuery = useGetSeveralDiscounts();
	const discountsList = severalDiscountsQuery.data?.data?.data || [];
	const discountsListOptions = formatList(discountsList, "name", "id");

	const [saleData, setSaleData] = React.useState({
		subtotal: 0,
		tax: 0,
		discount: 0,
		total: 0,
	});

	const form = useForm<Sale>({
		resolver: zodResolver(saleSchema),
		defaultValues: {
			subtotal: 0,
			total: 0,
			note: "",
			sale_items: [],
		},
	});

	const saleItemsFieldsArray = useFieldArray({
		name: "sale_items",
		control: form.control,
	});

	const discountInput = form.watch("discount_id");
	const taxInput = form.watch("tax_id");
	const discountFound =
		discountInput && discountsList.find((discount: any) => discount.id === discountInput);
	const taxFound = taxInput && taxesList.find((tax: any) => tax.id === taxInput);
	const subtotal = form.watch("subtotal") || 0;

	React.useEffect(() => {
		const discountType = discountFound && discountFound?.amount_type;
		const discount =
			discountType === "PERCENTAGE"
				? (subtotal * discountFound.amount) / 100
				: discountFound?.amount || 0;
		const tax = (taxFound && (subtotal * taxFound?.rate) / 100) || 0;
		const total = subtotal - discount + tax;

		setSaleData({
			subtotal,
			tax,
			discount,
			total,
		});
		form.setValue("total", total);
	}, [subtotal, discountFound, taxFound, form]);

	const onSubmit: SubmitHandler<Sale> = (formData: Sale) => {
		const formDataFormatted = clearObject(formData);

		createSale(formDataFormatted, {
			onSuccess: (response) => response.status === 201 && form.reset(),
		});
	};

	return (
		<div>
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4 grid-cols-3">
							<div className="col-span-2">
								<FormControl>
									<Tabs defaultValue="quick-charge" className="max-w-xl">
										<TabsList className="grid w-full grid-cols-2">
											<TabsTrigger value="quick-charge">
												Cobro rápido
											</TabsTrigger>
											<TabsTrigger value="itemized-sale">
												Venta detallada
											</TabsTrigger>
										</TabsList>
										<TabsContent value="quick-charge" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Detalles de Transacción</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													<FormField
														control={form.control}
														name="subtotal"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Monto</FormLabel>
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
														name="discount_id"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Descuento</FormLabel>
																<FormControl>
																	<Combobox
																		{...field}
																		form={form}
																		data={discountsListOptions}
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
													<FormField
														control={form.control}
														name="note"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Nota</FormLabel>
																<FormControl>
																	<Textarea
																		{...field}
																		disabled={isLoading}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</CardContent>
											</Card>
											<Card>
												<CardHeader>
													<CardTitle>Detalles de Pago</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													<FormField
														control={form.control}
														name="customer_id"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Clientes</FormLabel>
																<FormControl>
																	<Combobox
																		notFoundAction={
																			<CustomerDialogForm />
																		}
																		{...field}
																		form={form}
																		data={customersListOptions}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													{/* <FormField
														control={form.control}
														name="payment_method"
														render={({ field }) => (
															<FormItem className="space-y-3">
																<FormLabel>
																	Método de pago
																</FormLabel>
																<FormControl>
																	<RadioGroup
																		onValueChange={
																			field.onChange
																		}
																		defaultValue={field.value}
																		className="flex flex-col space-y-1"
																	>
																		<FormItem className="flex items-center space-x-3 space-y-0">
																			<FormControl>
																				<RadioGroupItem value="cash" />
																			</FormControl>
																			<FormLabel className="font-normal">
																				Efectivo
																			</FormLabel>
																		</FormItem>
																		<FormItem className="flex items-center space-x-3 space-y-0">
																			<FormControl>
																				<RadioGroupItem value="electronic" />
																			</FormControl>
																			<FormLabel className="font-normal">
																				Electrónico
																			</FormLabel>
																		</FormItem>
																	</RadioGroup>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/> */}
												</CardContent>
											</Card>
										</TabsContent>
										<TabsContent value="itemized-sale" className="space-y-4">
											<Card>
												<CardHeader>
													<CardTitle>Detalles de Transacción</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													<Command className="relative overflow-auto">
														<Popover
															open={focus}
															onOpenChange={setFocus}
														>
															<PopoverTrigger asChild>
																<CommandInput
																	placeholder="Buscar un elemento..."
																	onClick={() => setFocus(true)}
																/>
															</PopoverTrigger>
															<PopoverContent className="p-0 w-full">
																<CommandEmpty>
																	No se encontran elementos.
																	<br />
																</CommandEmpty>
																<CommandGroup
																// className={cn(
																// 	focus ? "block absolute w-full bg-background" : "hidden",
																// )}
																>
																	{itemsListOptions?.map(
																		(item: any) => (
																			<CommandItem
																				{...props}
																				value={item.value}
																				key={item.value}
																				onSelect={(
																					currentValue
																				) => {
																					saleItemsFieldsArray.append(
																						{
																							item_id:
																								currentValue,
																							quantity: 1,
																							price: item.price,
																						}
																					);
																				}}
																			>
																				{item.label}
																			</CommandItem>
																		)
																	)}
																</CommandGroup>
															</PopoverContent>
														</Popover>
													</Command>
													<FormField
														control={form.control}
														name="discount_id"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Descuento</FormLabel>
																<FormControl>
																	<Combobox
																		{...field}
																		form={form}
																		data={discountsListOptions}
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
													<FormField
														control={form.control}
														name="note"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Nota</FormLabel>
																<FormControl>
																	<Textarea
																		{...field}
																		disabled={isLoading}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</CardContent>
											</Card>
											<Card>
												<CardHeader>
													<CardTitle>Detalles de Pago</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													<FormField
														control={form.control}
														name="customer_id"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Clientes</FormLabel>
																<FormControl>
																	<Combobox
																		{...field}
																		form={form}
																		data={customersListOptions}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</CardContent>
											</Card>
										</TabsContent>
									</Tabs>
								</FormControl>
							</div>
							<div className="col-span-1">
								<div>
									<ScrollArea className="full">
										<div>
											{saleItemsFieldsArray.fields.map((field, index) => (
												<div
													key={field.id}
													className="flex items-center justify-between py-2 border-b"
												>
													<div className="text-sm">
														{
															itemsListOptions.find(
																(item: any) =>
																	item.value === field.item_id
															)?.label
														}
													</div>
													<div className="text-sm text-foreground">
														Cantidad: {field.quantity}
													</div>
													<Button
														type="button"
														variant="link"
														size="sm"
														onClick={() =>
															saleItemsFieldsArray.remove(index)
														}
													>
														Eliminar
													</Button>
												</div>
											))}
										</div>
									</ScrollArea>
								</div>
								<br />
								<div>
									<div className="space-y-4">
										{/* Sale Details */}
										<div className="flex items-center justify-between">
											<div className="text-sm text-gray-500">Subtotal</div>
											<div className="text-sm font-medium">
												{formatCurrency(saleData.subtotal)}
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div className="text-sm text-gray-500">Descuento</div>
											<div className="text-sm font-medium">
												{formatCurrency(saleData.discount)}
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div className="text-sm text-gray-500">Impuesto</div>
											<div className="text-sm font-medium">
												{formatCurrency(saleData.tax)}
											</div>
										</div>
										<Separator />
										<div className="flex items-center justify-between">
											<div className="text-sm text-gray-500">Total</div>
											<div className="text-sm font-medium">
												{formatCurrency(saleData.total)}
											</div>
										</div>
									</div>
									<div>
										<Button className="w-full mt-4" isLoading={isLoading}>
											Pagar
										</Button>
										<Button
											type="button"
											variant="ghost"
											onClick={() => form.reset()}
											className="w-full mt-4"
											isLoading={isLoading}
										>
											Cancelar
										</Button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</Form>
		</div>
	);
}
