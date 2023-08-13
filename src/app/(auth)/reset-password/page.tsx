import { Metadata } from "next";

import { Icons } from "@/components/icons";
import { UserResetPasswordForm } from "@/components/forms/user-reset-password-form";
import ButtonBack from "@/components/button-back";

export const metadata: Metadata = {
	title: "Recuperar cuenta",
	description: "Recuperar cuenta",
};

export default function ResetPasswordPage() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<ButtonBack title="Atrás" />
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<Icons.logo className="mx-auto h-6 w-6" />
					<h1 className="text-2xl font-semibold tracking-tight">Cambiar Contraseña</h1>
					<p className="text-sm text-muted-foreground">Ingresa tu nueva contraseña.</p>
				</div>
				<UserResetPasswordForm />
			</div>
		</div>
	);
}
