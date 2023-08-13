"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { UserUpdatePassword, userResetPasswordSchema } from "@/lib/validations/user";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/auth/use-reset-password";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserResetPasswordForm = ({ className, ...props }: UserAuthFormProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: resetPassword } = useResetPassword();

	const form = useForm<UserUpdatePassword>({
		resolver: zodResolver(userResetPasswordSchema),
	});

	const onSubmit: SubmitHandler<UserUpdatePassword> = (formData: UserUpdatePassword) => {
		resetPassword(
			{
				new_password: formData.password,
				token: searchParams.get("token"),
			},
			{
				onSuccess: (response) => response.status === 200 && router.push("/signin"),
			}
		);
	};

	return (
		<>
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
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

							<Button isLoading={isLoading}>Recuperar cuenta</Button>
						</div>
					</form>
				</div>
			</Form>
		</>
	);
};
