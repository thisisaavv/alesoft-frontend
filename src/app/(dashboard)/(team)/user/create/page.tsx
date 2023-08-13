import { Metadata } from "next";
import { UserForm } from "@/components/forms/user-form";

export const metadata: Metadata = {
	title: "Usuarios",
	description: "Users",
};

export default function UserRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Usuario</h2>
					{/* <p className="text-muted-foreground">
						Here&apos;s a list of your tasks for this month!
					</p> */}
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			<UserForm />
		</>
	);
}
