"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateBackup } from "@/hooks/backup/use-create-backup";

export default function BackupPage() {
	const backup = useCreateBackup();

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Copia de Seguridad</h3>
				<p className="text-sm text-muted-foreground">
					Crea una copia de seguridad de la base de datos.
				</p>
			</div>
			<Separator />
			<div className="">
				<Button type="button" onClick={() => backup.mutate()}>
					Crear Copia de Seguridad
				</Button>
			</div>
		</div>
	);
}
