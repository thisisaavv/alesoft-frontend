"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { Parameter, parameterSchema } from "@/lib/validations/parameter";
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
import { clearObject, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateParameter } from "@/hooks/parameter/use-create-parameter";
import { useUpdateParameter } from "@/hooks/parameter/use-update-parameter";

interface ParameterFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Parameter;
}

export function ParameterForm({ className, ...props }: ParameterFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createParameter } = useCreateParameter();
	const { mutate: updateParameter } = useUpdateParameter();

	const form = useForm<Parameter>({
		resolver: zodResolver(parameterSchema),
		defaultValues: props.data ?? {
			name: "",
			description: "",
			value: "",
		},
	});

	const onSubmit: SubmitHandler<Parameter> = (formData: Parameter) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateParameter({
				id: props.data.id!,
				data: formDataFormatted,
			});
		}

		createParameter({ data: formDataFormatted });
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
								name="value"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Valor</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
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
