import { AppearanceForm } from "@/components/forms/appearance-form";
import { Separator } from "@/components/ui/separator";

export default function SettingsAppearancePage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Apariencia</h3>
				<p className="text-sm text-muted-foreground">
					{/* Customize the appearance of the app. Automatically switch between day and night themes. */}
					Personaliza la apariencia de la aplicación.
				</p>
			</div>
			<Separator />
			<AppearanceForm />
		</div>
	);
}
