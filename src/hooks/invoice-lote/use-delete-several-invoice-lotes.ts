import { useMutation } from "@tanstack/react-query";

import { deleteSeveralInvoiceLotes } from "@/lib/requests/invoice-lotes";

export function useDeleteSeveralInvoiceLotes() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralInvoiceLotes(data),
	});
}
