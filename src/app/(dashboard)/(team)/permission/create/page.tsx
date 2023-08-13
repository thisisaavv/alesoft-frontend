import { Metadata } from "next";
import { UserRoleForm } from "@/components/forms/user-role-form";

export const metadata: Metadata = {
	title: "Crear Rol de Usuario",
	description: "Crear Rol de Usuario",
};

export default function UserRoleRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Rol</h2>
				</div>
			</div>
			<UserRoleForm />
		</>
	);
}
