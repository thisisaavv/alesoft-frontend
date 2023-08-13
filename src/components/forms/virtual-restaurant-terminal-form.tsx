"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import * as React from "react";

import { clearObject, cn, formatCurrency, formatList } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Button } from "@/components/ui/button";
import { useGetSeveralItems } from "@/hooks/item/use-get-several-items";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useCreateSale } from "@/hooks/sale/use-create-sale";
import { Item } from "@/lib/validations/item";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetSeveralDiscounts } from "@/hooks/discount/use-get-several-discounts";
import { useGetSeveralTaxes } from "@/hooks/tax/use-get-several-taxes";
import { Textarea } from "../ui/textarea";
import { Combobox } from "../ui/combobox";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface ItemFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const randomColors = [
	"bg-red-500",
	"bg-yellow-500",
	"bg-green-500",
	"bg-blue-500",
	"bg-indigo-500",
	"bg-purple-500",
	"bg-pink-500",
	"bg-red-400",
];

export function SaleItemForm({ className, ...props }: any) {
	return (
		<div className="grid gap-4 mt-4">
			<FormField
				control={props.form.control}
				name="type"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel>Notify me about...</FormLabel>
						<FormControl>
							<RadioGroup
								onValueChange={field.onChange}
								defaultValue={field.value}
								className="flex flex-col space-y-1"
							>
								<FormItem className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value="all" />
									</FormControl>
									<FormLabel className="font-normal">All new messages</FormLabel>
								</FormItem>
								<FormItem className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value="mentions" />
									</FormControl>
									<FormLabel className="font-normal">
										Direct messages and mentions
									</FormLabel>
								</FormItem>
								<FormItem className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value="none" />
									</FormControl>
									<FormLabel className="font-normal">Nothing</FormLabel>
								</FormItem>
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}

export function VirtualRestaurantTerminalForm({ className, ...props }: ItemFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createSale } = useCreateSale();
	const [saleData, setSaleData] = React.useState({
		subtotal: 0,
		tax: 0,
		discount: 0,
		total: 0,
	});

	const severalTaxesQuery = useGetSeveralTaxes();
	const taxesList = severalTaxesQuery.data?.data?.data || [];
	const taxesListOptions = formatList(taxesList, "name", "id");
	const severalDiscountsQuery = useGetSeveralDiscounts();
	const discountsList = severalDiscountsQuery.data?.data?.data || [];
	const discountsListOptions = formatList(discountsList, "name", "id");

	const severalItemsQuery = useGetSeveralItems();
	const itemsList = React.useMemo(
		() => severalItemsQuery.data?.data?.data || [],
		[severalItemsQuery.data]
	);
	const itemsListOptions = itemsList.map((item: Item) => ({
		label: item.name,
		value: item.id,
		price: item.price,
		quantity: item.quantity,
	})) as Array<{ label: string; value: string; price: number; quantity: number }>;

	const form = useForm<Sale>({
		resolver: zodResolver(saleSchema),
		defaultValues: {
			subtotal: 0,
			total: 0,
			note: "",
			sale_items: [],
		},
	});

	const discountInput = form.watch("discount_id");
	const taxInput = form.watch("tax_id");
	const discountFound =
		discountInput && discountsList.find((discount: any) => discount.id === discountInput);
	const taxFound = taxInput && taxesList.find((tax: any) => tax.id === taxInput);

	const findItem = React.useCallback(
		(id: string) => {
			const item = itemsList.find((item: any) => item.id === id);
			return item;
		},
		[itemsList]
	);

	const saleItemsFieldsArray = useFieldArray({
		name: "sale_items",
		control: form.control,
	});

	React.useEffect(() => {
		const subtotal = saleItemsFieldsArray.fields.reduce(
			(acc, field) => acc + field.quantity * findItem(field.item_id)?.price,
			0
		);
		const discountType = discountFound && discountFound?.amount_type;
		const discountFoundAmount = discountFound?.amount || 0;
		const discount =
			discountType === "PERCENTAGE"
				? (subtotal * discountFoundAmount) / 100
				: discountFoundAmount;
		const tax = (taxFound && (subtotal * taxFound?.rate) / 100) || 0;
		const total = subtotal - discount + tax;

		setSaleData({
			subtotal,
			discount,
			tax,
			total,
		});

		form.setValue("total", total);
	}, [form, findItem, saleItemsFieldsArray.fields, discountFound, taxFound]);

	const findLabel = (id: string) => {
		const item = itemsListOptions.find((item: any) => item.value === id);
		return item?.label;
	};

	const onSubmit: SubmitHandler<Sale> = (formData: Sale) => {
		const formDataFormatted = clearObject(formData);

		createSale(formDataFormatted, {
			onSuccess: (response) => {
				response.status === 201 && form.reset();
				window.location.href = `/terminal/checkout/complete`;
			},
		});
	};

	return (
		<div className="grid grid-cols-4">
			<div className="col-span-3">
				<div className="grid grid-cols-4">
					{itemsListOptions?.map((item: any) => (
						<div
							key={item.value}
							className={cn(
								"col-span-1 cursor-pointer h-36 p-4 border-b-2 border-r-2 border-gray-300",
								item.quantity > 0 ? "bg-gray-200" : "bg-gray-100"
							)}
							onClick={
								item.quantity > 0
									? () => {
											saleItemsFieldsArray.append({
												item_id: item.value,
												quantity: 1,
												price: item.price,
											});
									  }
									: () => {
											alert("No hay stock de este producto");
									  }
							}
						>
							<div>{item.label}</div>
						</div>
					))}
				</div>
			</div>
			<div className="col-span-1 h-screen flex flex-col items-center border-l">
				<div>
					<ScrollArea className="h-[180px] w-[350px]">
						<div>
							{saleItemsFieldsArray.fields.map((field, index) => (
								<div
									key={field.id}
									className="flex items-center justify-between py-2 border-b"
								>
									<div className="text-sm">{findLabel(field.item_id)}</div>
									<div className="text-sm text-foreground">
										Cantidad: {field.quantity}
									</div>
									<div className="text-sm text-foreground">
										Precio: {field.price}
									</div>
									<Button
										type="button"
										variant="link"
										size="sm"
										onClick={() => saleItemsFieldsArray.remove(index)}
									>
										<Icons.trash className="w-4 h-4" />
									</Button>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>
				<div className="w-full p-4 h-full justify-self-end">
					<Form {...form}>
						<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
							<div className="mb-2">
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
												<Textarea {...field} disabled={isLoading} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="space-y-4">
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
							<div className="content-end">
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
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
