import { NotificationsForm } from "@/components/forms/notifications-form";
import { Separator } from "@/components/ui/separator";

export default function SettingsNotificationsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Notificaciones</h3>
				<p className="text-sm text-muted-foreground">
					{/* Configure how you receive notifications. */}
					Configura cómo recibes las notificaciones.
				</p>
			</div>
			<Separator />
			<NotificationsForm />
		</div>
	);
}
