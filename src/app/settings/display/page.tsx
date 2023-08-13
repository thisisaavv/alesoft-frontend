import { DisplayForm } from "@/components/forms/display-form";
import { Separator } from "@/components/ui/separator";

export default function SettingsDisplayPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Pantalla</h3>
				<p className="text-sm text-muted-foreground">
					{/* Turn items on or off to control what&apos;s displayed in the app. */}
					Activa o desactiva los elementos para controlar lo que se muestra en la
					aplicación.
				</p>
			</div>
			<Separator />
			<DisplayForm />
		</div>
	);
}
