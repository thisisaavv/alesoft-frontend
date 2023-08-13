import { useMutation } from "@tanstack/react-query";

import { updateTransaction } from "@/lib/requests/transactions";

export function useUpdateTransaction() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateTransaction(id, data),
		onMutate: async (variables) => ({
			method: "PUT",
			variables,
			queries: [["transactions"], ["transactions", variables.id]],
		}),
	});
}
