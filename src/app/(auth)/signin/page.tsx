import { Metadata } from "next";

import { UserAuthForm } from "@/components/forms/user-auth-form";
import { Logo } from "@/components/logo";
import ButtonBack from "@/components/button-back";

export const metadata: Metadata = {
	title: "Iniciar sesión",
	description: "Iniciar sesión",
};

export default function SignInPage() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<ButtonBack title="Atrás" />
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<span className="mx-auto">
						<Logo />
					</span>
					{/* <Icons.logo className="mx-auto h-6 w-6" /> */}
					<h1 className="text-2xl font-semibold tracking-tight">Bienvenido</h1>
					<p className="text-sm text-muted-foreground">
						Ingresa tu correo electrónico para iniciar sesión en tu cuenta
					</p>
				</div>
				<UserAuthForm />
			</div>
		</div>
	);
}
