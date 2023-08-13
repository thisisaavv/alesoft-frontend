"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { UserUpdatePassword, userResetPasswordSchema } from "@/lib/validations/user";
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
import { useChangePassword } from "@/hooks/auth/use-change-password";

interface SecurityFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SecurityForm = ({ className, ...props }: SecurityFormProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: resetPassword } = useChangePassword();

	const form = useForm<UserUpdatePassword>({
		resolver: zodResolver(userResetPasswordSchema),
	});

	const onSubmit: SubmitHandler<UserUpdatePassword> = (formData: UserUpdatePassword) => {
		resetPassword(
			{
				password: formData.password,
			},
			{
				onSuccess: (response) => response.status === 200 && form.reset(),
			}
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nueva contraseña</FormLabel>
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
							<FormItem>
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

				<Button type="submit">Actualizar</Button>
			</form>
		</Form>
	);
};
