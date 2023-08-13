"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/lib/validations/user";
import { useUpdateUser } from "@/hooks/user/use-update-user";

const profileFormSchema = userSchema.pick({
	username: true,
	email: true,
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm(props: { data?: any }) {
	const { mutate: updateUser } = useUpdateUser();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: props.data,
	});

	function onSubmit(data: ProfileFormValues) {
		updateUser({
			id: props.data?.id,
			data,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre de usuario</FormLabel>
							<FormControl>
								<Input placeholder="@juanperez" {...field} />
							</FormControl>
							<FormDescription>
								Este es tu nombre de pantalla público. Puede ser tu nombre real o un
								pseudónimo.
							</FormDescription>
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
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Actualizar perfil</Button>
			</form>
		</Form>
	);
}
