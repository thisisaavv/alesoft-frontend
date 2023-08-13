import { useMutation } from "@tanstack/react-query";

import { deleteInvoiceById } from "@/lib/requests/invoices";

export function useDeleteInvoice() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteInvoiceById(id),
		onMutate: async (variables) => ({
			method: "DELETE",
			variables,
			queries: [["invoices"], ["invoices", variables.id]],
		}),
	});
}
