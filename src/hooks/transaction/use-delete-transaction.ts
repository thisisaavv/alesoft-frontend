import { useMutation } from "@tanstack/react-query";

import { deleteTransactionById } from "@/lib/requests/transactions";

export function useDeleteTransaction() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteTransactionById(id),
		onMutate: async (variables) => ({
			method: "DELETE",
			variables,
			queries: [["transactions"], ["transactions", variables.id]],
		}),
	});
}
