import { useMutation } from "@tanstack/react-query";

import { createInvoiceLote } from "@/lib/requests/invoice-lotes";

export function useCreateInvoiceLote() {
	return useMutation({
		mutationFn: (data: any) => createInvoiceLote(data),
		onMutate: async (variables) => ({
			method: "POST",
			variables,
			queries: ["invoice-lotes"],
		}),
	});
}
