import { useMutation } from "@tanstack/react-query";

import { updateInvoiceLote } from "@/lib/requests/invoice-lotes";

export function useUpdateInvoiceLote() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateInvoiceLote(id, data),
		onMutate: async (variables) => ({
			method: "PUT",
			variables,
			queries: [["invoice-lotes"], ["invoice-lotes", variables.id]],
		}),
	});
}
