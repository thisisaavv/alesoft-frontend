import { useMutation } from "@tanstack/react-query";

import { updateInvoice } from "@/lib/requests/invoices";

export function useUpdateInvoice() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateInvoice(id, data),
		onMutate: async (variables) => ({
			method: "PUT",
			variables,
			queries: [["invoices"], ["invoices", variables.id]],
		}),
	});
}
