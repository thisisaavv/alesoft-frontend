"use client";

import { ProfileForm } from "@/components/forms/profile-form";
import { Separator } from "@/components/ui/separator";
import { useUserAuth } from "@/hooks/auth/use-auth-user";

export default function SettingsProfilePage() {
	const userAuthQuery = useUserAuth();
	const userData = userAuthQuery.data?.data?.data;

	if (userAuthQuery.isLoading) {
		return <div>Cargando...</div>;
	}

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Perfil</h3>
				<p className="text-sm text-muted-foreground">
					Esto es como los demás te verán en el sitio.
				</p>
			</div>
			<Separator />
			<ProfileForm data={userData} />
		</div>
	);
}
