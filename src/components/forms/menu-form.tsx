"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { Menu, menuSchema } from "@/lib/validations/menu";
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
import { useCreateMenu } from "@/hooks/menu/use-create-menu";
import { useUpdateMenu } from "@/hooks/menu/use-update-menu";

interface MenuFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Menu;
}

export function MenuForm({ className, ...props }: MenuFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createMenu } = useCreateMenu();
	const { mutate: updateMenu } = useUpdateMenu();

	const form = useForm<Menu>({
		resolver: zodResolver(menuSchema),
		defaultValues: props.data ?? {
			name: "",
			description: "",
		},
	});

	const onSubmit: SubmitHandler<Menu> = (formData: Menu) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateMenu({ id: props.data.id, data: formDataFormatted });
		}

		createMenu({ data: formDataFormatted });
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
												placeholder="e.g. Menú de desayuno"
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
