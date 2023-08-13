"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { Employee, employeeSchema } from "@/lib/validations/employee";
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
import { useCreateEmployee } from "@/hooks/employee/use-create-employee";
import { useUpdateEmployee } from "@/hooks/employee/use-update-employee";
import { DatePicker } from "@/components/date-picker";
import { Combobox } from "@/components/ui/combobox";
import { useGetSeveralJobs } from "@/hooks/job/use-get-several-jobs";
import {
	Select,
	SelectContent,
	SelectValue,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { useUserAuth } from "@/hooks/auth/use-auth-user";
import { ContactForm } from "./contact-form";

interface EmployeeFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Employee;
}

const contractListOptions: {
	label: string;
	value: "TEMPORARY" | "FULL_TIME" | "PART_TIME" | "VOLUNTEER" | "OTHER";
}[] = [
	{ label: "Temporal", value: "TEMPORARY" },
	{ label: "Tiempo completo", value: "FULL_TIME" },
	{ label: "Medio tiempo", value: "PART_TIME" },
	{ label: "Voluntario", value: "VOLUNTEER" },
	{ label: "Otro", value: "OTHER" },
];

export function EmployeeForm({ className, ...props }: EmployeeFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createEmployee } = useCreateEmployee();
	const { mutate: updateEmployee } = useUpdateEmployee();
	const severalJobsQuery = useGetSeveralJobs();
	const jobsList: Employee[] = severalJobsQuery.data?.data?.data || [];
	const jobsListOptions = formatList(jobsList, "name", "id");
	const userAuth = useUserAuth().data?.data?.data;
	const userAuthCompany = userAuth?.Employee?.company_id;

	const form = useForm<Employee>({
		resolver: zodResolver(employeeSchema),
		defaultValues: props.data ?? {
			first_name: "",
			// middle_name: "",
			last_name: "",
			company_id: null,
			// job_id: undefined,
			id_card: "",
			// birthdate: null,
			emails: [],
			phones: [],
			city: "",
			state: "",
			country: "",
			street: "",
			website_url: "",
		},
	});

	React.useEffect(() => {
		if (userAuthCompany) form.setValue("company_id", userAuthCompany);
	}, [form, userAuthCompany]);

	const onSubmit: SubmitHandler<Employee> = (formData: Employee) => {
		const formDataFormatted = clearObject(formData);
		console.log(formDataFormatted);
		if (props.data) {
			return updateEmployee({
				id: props.data.id!,
				data: formDataFormatted,
			});
		}

		createEmployee({ data: formDataFormatted });
		form.reset();
	};

	return (
		<div className="max-w-2xl">
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<div className="flex items-center gap-4">
								<FormField
									control={form.control}
									name="first_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombre</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													placeholder="e.g. Juan"
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
									name="last_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Apellido</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													placeholder="e.g. Perez"
													autoCorrect="off"
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex items-center gap-4">
								<FormField
									control={form.control}
									name="id_card"
									render={({ field }) => (
										<FormItem>
											<FormLabel>DNI</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													placeholder="e.g. 123456789123"
													minLength={8}
													maxLength={13}
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
									name="birthdate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Fecha de cumpleaños</FormLabel>
											<FormControl>
												<DatePicker {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="job_id"
								render={({ field, fieldState, formState }) => (
									<FormItem>
										<FormLabel>Puesto de trabajo</FormLabel>
										<FormControl>
											<Combobox
												{...field}
												form={form}
												data={jobsListOptions}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="contract_type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo de Contrato</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={(value) => {
													form.setValue("contract_type", value as any);
												}}
											>
												<SelectTrigger>
													<SelectValue
														placeholder={
															contractListOptions?.find(
																(contract) =>
																	contract.value === field.value
															)?.label ?? "Seleccionar"
														}
													/>
												</SelectTrigger>
												<SelectContent side="top">
													{contractListOptions?.map((job) => (
														<SelectItem
															key={job.value}
															value={job.value}
														>
															{job.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
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
										form.setFocus("first_name");
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
