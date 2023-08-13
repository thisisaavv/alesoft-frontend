"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Provider, providerSchema } from "@/lib/validations/provider";
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
import { clearObject, cn, formatList } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCreateProvider } from "@/hooks/provider/use-create-provider";
import { useUpdateProvider } from "@/hooks/provider/use-update-provider";
import { ContactForm } from "./contact-form";

interface ProviderFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Provider;
}

export function ProviderForm({ className, ...props }: ProviderFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createProvider } = useCreateProvider();
	const { mutate: updateProvider } = useUpdateProvider();

	const form = useForm<Provider>({
		resolver: zodResolver(providerSchema),
		defaultValues: props.data ?? {
			enabled: false,
			name: "",
			bussiness_id: "",
			emails: [],
			phones: [],
			city: "",
			state: "",
			country: "",
			street: "",
			// website_url: null,
		},
	});

	const onSubmit: SubmitHandler<Provider> = (formData: Provider) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateProvider({
				id: props.data.id!,
				data: formDataFormatted,
			});
		}

		createProvider({ data: formDataFormatted });
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
												placeholder="e.g. Bodega Abarrotes"
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
								name="bussiness_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>RTN</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												maxLength={14}
												minLength={10}
												placeholder="e.g 12345678901234"
												autoCorrect="off"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<ContactForm form={form} />
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
