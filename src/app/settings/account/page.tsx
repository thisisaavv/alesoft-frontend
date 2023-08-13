"use client";

import { AccountForm } from "@/components/forms/account-form";
import { Separator } from "@/components/ui/separator";
import { useUserAuth } from "@/hooks/auth/use-auth-user";

export default function SettingsAccountPage() {
	const userAuthQuery = useUserAuth();
	const employeeData = userAuthQuery.data?.data?.data?.Employee;

	if (userAuthQuery.isLoading) {
		return <div>Cargando...</div>;
	}

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Cuenta</h3>
				<p className="text-sm text-muted-foreground">
					Actualiza la configuración de tu cuenta.
				</p>
			</div>
			<Separator />
			<AccountForm data={employeeData} />
		</div>
	);
}
