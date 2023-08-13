"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
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
import { UserRecoverAccount, userRecoverAccountSchema } from "@/lib/validations/user";
import { useRecoverAccount } from "@/hooks/auth/use-recover-account";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserRecoverForm = ({ className, ...props }: UserAuthFormProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: recoverAccount } = useRecoverAccount();

	const form = useForm<UserRecoverAccount>({
		resolver: zodResolver(userRecoverAccountSchema),
	});

	const onSubmit: SubmitHandler<UserRecoverAccount> = (formData: UserRecoverAccount) => {
		recoverAccount(formData, {
			onSuccess: () => router.push("/signin"),
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
							<Button isLoading={isLoading}>Recuperar cuenta</Button>
						</div>
					</form>
				</div>
			</Form>
		</>
	);
};
