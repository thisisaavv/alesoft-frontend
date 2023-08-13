import { useMutation } from "@tanstack/react-query";

import { deleteSeveralTaxes } from "@/lib/requests/taxes";

export function useDeleteSeveralTaxes() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralTaxes(data),
	});
}
