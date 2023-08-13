import { useMutation } from "@tanstack/react-query";

import { createInvoice } from "@/lib/requests/invoices";

export function useCreateInvoice() {
	return useMutation({
		mutationFn: (data: any) => createInvoice(data),
		onMutate: async (variables) => ({
			method: "POST",
			variables,
			queries: ["invoices"],
		}),
	});
}
