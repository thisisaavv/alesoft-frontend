import { useMutation } from "@tanstack/react-query";

import { createTransaction } from "@/lib/requests/transactions";

export function useCreateTransaction() {
	return useMutation({
		mutationFn: (data: any) => createTransaction(data),
		onMutate: async (variables) => ({
			method: "POST",
			variables,
			queries: ["transactions"],
		}),
	});
}
