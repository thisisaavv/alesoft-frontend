import { useMutation } from "@tanstack/react-query";

import { deleteSeveralParameters } from "@/lib/requests/parameters";

export function useDeleteSeveralTaxes() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralParameters(data),
	});
}
