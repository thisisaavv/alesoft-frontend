"use client";

import { Separator } from "@/components/ui/separator";
import { SystemSettingsForm } from "@/components/forms/system-settings-form";
import { useGetSeveralParameters } from "@/hooks/parameter/use-get-several-parameters";

export default function SystemSettingsPage() {
	const { data: severalParameters, isLoading: isLoadingParameters } = useGetSeveralParameters();
	const parametersList = {
		parameters: severalParameters?.data?.data || [],
	};

	if (isLoadingParameters) return <div>Cargando...</div>;

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Párametros del sistema</h3>
				<p className="text-sm text-muted-foreground">
					Los parámetros del sistema son los datos que se utilizan para la configuración
					de la aplicación.
				</p>
			</div>
			<Separator />
			<SystemSettingsForm data={parametersList} />
		</div>
	);
}
