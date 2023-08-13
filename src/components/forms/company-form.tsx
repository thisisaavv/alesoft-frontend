"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Company, companySchema } from "@/lib/validations/company";
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
import { useCreateCompany } from "@/hooks/company/use-create-company";
import { useUpdateCompany } from "@/hooks/company/use-update-company";
import { ContactForm } from "./contact-form";

interface CompanyFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Company;
}

export function CompanyForm({ className, ...props }: CompanyFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createCompany } = useCreateCompany();
	const { mutate: updateCompany } = useUpdateCompany();

	const form = useForm<Company>({
		resolver: zodResolver(companySchema),
		defaultValues: props.data ?? {
			name: "",
			bussiness_id: "",
			emails: [],
			phones: [],
			city: "",
			state: "",
			country: "",
			street: "",
			website_url: null,
		},
	});

	const onSubmit: SubmitHandler<Company> = (formData: Company) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateCompany({
				id: props.data.id!,
				data: formDataFormatted,
			});
		}

		createCompany({ data: formDataFormatted });
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
												placeholder="e.g. Google"
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
												type="number"
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
