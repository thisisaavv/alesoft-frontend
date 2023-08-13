"use client";

import { useFieldArray } from "react-hook-form";
import * as React from "react";

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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ContactFormProps extends React.HTMLAttributes<HTMLDivElement> {
	form: any;
}

const countryListOptions: {
	label: string;
	value: string;
}[] = [
	{ label: "Honduras", value: "Honduras" },
	{ label: "Otro", value: "Otro" },
];

const stateListOptions: {
	label: string;
	value: string;
}[] = [
	{ label: "Yoro", value: "Yoro" },
	{ label: "Otro", value: "Otro" },
];

const cityListOptions: {
	label: string;
	value: string;
}[] = [
	{ label: "Olanchito", value: "Olanchito" },
	{ label: "Otro", value: "Otro" },
];

export function ContactForm({ className, ...props }: ContactFormProps) {
	const emailsFieldArray = useFieldArray({
		control: props.form.control,
		name: "emails",
	});
	const phonesFieldArray = useFieldArray({
		control: props.form.control,
		name: "emails",
	});

	return (
		<div className="grid gap-4 mt-4">
			<h2 className="text-lg font-bold tracking-tight">Información de Contacto</h2>
			<div>
				{emailsFieldArray.fields.map((field, index) => (
					<FormField
						control={props.form.control}
						key={field.id}
						name={`emails.${index}`}
						render={({ field }) => (
							<FormItem>
								<FormLabel className={cn(index !== 0 && "sr-only")}>
									Correo electrónico
								</FormLabel>
								<FormControl>
									<div className="flex items-center align-middle">
										<Input
											{...field}
											type="email"
											placeholder="name@example.com"
										/>
										<Button
											type="button"
											variant="link"
											size="sm"
											onClick={() => emailsFieldArray.remove(index)}
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
						props.form.setFocus(`emails.${props.form.getValues("emails").length - 1}}`);
						emailsFieldArray.append("");
					}}
				>
					Agregar correo
				</Button>
			</div>
			<div>
				{phonesFieldArray.fields.map((field, index) => (
					<FormField
						control={props.form.control}
						key={field.id}
						name={`phones.${index}`}
						render={({ field }) => (
							<FormItem>
								<FormLabel className={cn(index !== 0 && "sr-only")}>
									Teléfono
								</FormLabel>
								<FormControl>
									<div className="flex items-center align-middle">
										<Input
											{...field}
											type="number"
											step=".01"
											minLength={8}
											min={0}
											maxLength={14}
											placeholder="e.g 88880000"
											autoCorrect="off"
										/>
										<Button
											type="button"
											variant="link"
											size="sm"
											onClick={() => phonesFieldArray.remove(index)}
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
						props.form.setFocus(`phones.${props.form.getValues("phones").length - 1}}`);
						phonesFieldArray.append("");
					}}
				>
					Agregar teléfono
				</Button>
			</div>
			<FormField
				control={props.form.control}
				name="website_url"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Sitio web</FormLabel>
						<FormControl>
							<Input
								{...field}
								type="text"
								placeholder="e.g. https://sitioweb.com"
								autoCorrect="off"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={props.form.control}
				name="country"
				render={({ field }) => (
					<FormItem>
						<FormLabel>País</FormLabel>
						<FormControl>
							<Select
								value={field.value}
								onValueChange={(value) => {
									props.form.setValue("country", value as any);
								}}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={
											countryListOptions?.find(
												(country) => country.value === field.value
											)?.label ?? "Seleccionar país"
										}
									/>
								</SelectTrigger>
								<SelectContent side="top">
									{countryListOptions?.map((country) => (
										<SelectItem key={country.value} value={country.value}>
											{country.label}
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
				control={props.form.control}
				name="state"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Departamento</FormLabel>
						<FormControl>
							<Select
								value={field.value}
								onValueChange={(value) => {
									props.form.setValue("state", value as any);
								}}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={
											stateListOptions?.find(
												(state) => state.value === field.value
											)?.label ?? "Seleccionar departamento"
										}
									/>
								</SelectTrigger>
								<SelectContent side="top">
									{stateListOptions?.map((state) => (
										<SelectItem key={state.value} value={state.value}>
											{state.label}
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
				control={props.form.control}
				name="city"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Ciudad</FormLabel>
						<FormControl>
							<Select
								value={field.value}
								onValueChange={(value) => {
									props.form.setValue("city", value as any);
								}}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={
											cityListOptions?.find(
												(city) => city.value === field.value
											)?.label ?? "Seleccionar ciudad"
										}
									/>
								</SelectTrigger>
								<SelectContent side="top">
									{cityListOptions?.map((city) => (
										<SelectItem key={city.value} value={city.value}>
											{city.label}
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
				control={props.form.control}
				name="street"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Dirección</FormLabel>
						<FormControl>
							<Input
								{...field}
								type="text"
								placeholder="e.g. Col. El Centro"
								autoCorrect="off"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
