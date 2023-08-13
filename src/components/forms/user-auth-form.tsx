"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Icons } from "../icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/auth/use-sign-in";
import { UserSignIn, userSignInSchema } from "@/lib/validations/user";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
	const router = useRouter();
	const signInQuery = useSignIn();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [message, setMessage] = React.useState<string | null>(null);

	const form = useForm<UserSignIn>({
		resolver: zodResolver(userSignInSchema),
	});

	const onSubmit: SubmitHandler<UserSignIn> = (formData: UserSignIn) => {
		setIsLoading(true);
		setMessage(null);

		signInQuery.mutate(formData, {
			onSuccess(response, variables, context) {
				const responseStatus = response.status;
				if (responseStatus === 200) {
					localStorage.setItem("token", (response as any).data.token);
					router.push("/dashboard");
				}
				if (responseStatus === 401 || responseStatus === 403 || responseStatus === 404) {
					setMessage("Nombre de usuario o contraseña no válidos.");
				}
				setIsLoading(false);
			},
		});
	};

	return (
		<>
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="identifier"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Correo electrónico o nombre de usuario
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												placeholder="@usuario"
												autoCapitalize="none"
												autoComplete="email"
												autoCorrect="off"
												disabled={isLoading}
												autoFocus
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
							<div className="w-full flex justify-end">
								<Link
									href="/recover"
									className="text-primary text-sm font-medium align-bottom"
								>
									¿Has olvidado tu contraseña?
								</Link>
							</div>
							<Button isLoading={isLoading}>Iniciar sesión</Button>
							{message && (
								<div className="w-full flex justify-center">
									<p className="text-red-500 text-sm">{message}</p>
								</div>
							)}
						</div>
					</form>
				</div>
			</Form>
		</>
	);
};
