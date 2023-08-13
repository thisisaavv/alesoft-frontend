import { useMutation } from "@tanstack/react-query";

import { deleteInvoiceLoteById } from "@/lib/requests/invoice-lotes";

export function useDeleteInvoiceLote() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteInvoiceLoteById(id),
		onMutate: async (variables) => ({
			method: "DELETE",
			variables,
			queries: [["invoice-lotes"], ["invoice-lotes", variables.id]],
		}),
	});
}
