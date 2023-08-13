"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { User, UserCreate, userCreateSchema, userSchema } from "@/lib/validations/user";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { clearObject, cn, formatList } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { useCreateUser } from "@/hooks/user/use-create-user";
import { useGetSeveralUserRoles } from "@/hooks/user-role/use-get-several-user-roles";
import { useGetSeveralEmployees } from "@/hooks/employee/use-get-several-employees";
import { useUpdateUser } from "@/hooks/user/use-update-user";

interface UserFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Partial<User>;
}

export function UserForm({ className, ...props }: UserFormProps) {
	const { mutate: createUser } = useCreateUser();
	const { mutate: updateUser } = useUpdateUser();
	const severalUserRoles = useGetSeveralUserRoles();
	const severalEmployees = useGetSeveralEmployees();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const userRolesList = severalUserRoles.data?.data?.data || [];
	const userRoleListOptions = formatList(userRolesList, "name", "id");
	const employeesList = severalEmployees.data?.data?.data || [];
	const employeesListOptions = formatList(employeesList, ["first_name", "last_name"], "id");

	const form = useForm<UserCreate>({
		resolver: zodResolver(userCreateSchema),
		defaultValues: props.data ?? {
			employee_id: "",
			username: "",
			email: "",
			password: "",
			confirm_password: "",
			user_role_id: "",
		},
	});

	React.useEffect(() => {
		if (props.data) {
			form.reset(props.data);
			form.setValue("confirm_password", props.data.password || "");
		}
	}, [props?.data, form]);

	const onSubmit: SubmitHandler<User> = (formData: User) => {
		const formDataFormatted = clearObject<User>(formData, ["confirm_password"]);

		if (props.data) {
			delete formDataFormatted.password;
			return updateUser({
				id: props.data.id,
				data: formDataFormatted,
			});
		}

		createUser({ data: formDataFormatted });
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
								name="employee_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Empleado</FormLabel>
										<FormControl>
											<Combobox
												{...field}
												form={form}
												data={employeesListOptions}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center gap-4">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombre de usuario</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="text"
													placeholder="@johndoe"
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
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Correo electrónico</FormLabel>
											<FormControl>
												<Input
													{...field}
													type="email"
													placeholder="name@example.com"
													autoCapitalize="none"
													autoComplete="email"
													autoCorrect="off"
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{!props.data && (
								<div className="flex items-center gap-4">
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem hidden={!!props.data}>
												<FormLabel>Contraseña</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="password"
														placeholder="••••••••••"
														autoCapitalize="none"
														autoComplete="none"
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
										name="confirm_password"
										render={({ field }) => (
											<FormItem hidden={!!props.data}>
												<FormLabel>Confirmar contraseña</FormLabel>
												<FormControl>
													<Input
														{...field}
														type="password"
														placeholder="••••••••••"
														autoCapitalize="none"
														autoComplete="none"
														autoCorrect="off"
														disabled={isLoading}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							)}
							<div className="flex items-center gap-4">
								<FormField
									control={form.control}
									name="user_role_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Rol</FormLabel>
											<FormControl>
												<Combobox
													{...field}
													form={form}
													data={userRoleListOptions}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex gap-4">
								<Button isLoading={isLoading}>
									{props.data ? "Actualizar" : "Registrar"}
								</Button>
								<Button
									variant="outline"
									type="reset"
									onClick={() => {
										form.setFocus("username");
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
