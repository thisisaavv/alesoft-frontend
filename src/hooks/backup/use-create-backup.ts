import { useMutation } from "@tanstack/react-query";

import { createBackup } from "@/lib/requests/backup";

export function useCreateBackup() {
	return useMutation({
		mutationFn: () => createBackup(),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			message: "La copia de seguridad se ha creado correctamente.",
			queries: ["backups"],
		}),
	});
}
