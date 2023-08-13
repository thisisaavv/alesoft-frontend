import { SecurityForm } from "@/components/forms/security-form";
import { Separator } from "@/components/ui/separator";

export default function SettingsSecurityPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Seguridad</h3>
				<p className="text-sm text-muted-foreground">
					Actualiza tu contraseña y configura la autenticación de dos factores.
				</p>
			</div>
			<Separator />
			<SecurityForm />
		</div>
	);
}
