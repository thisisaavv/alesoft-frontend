import { useMutation } from "@tanstack/react-query";

import { deletePurchaseById } from "@/lib/requests/purchases";

export function useDeletePurchase() {
	return useMutation({
		mutationFn: ({ id }: any) => deletePurchaseById(id),
		onMutate: async (variables) => ({
			method: "DELETE",
			variables,
			queries: [["purchases"], ["purchases", variables.id]],
		}),
	});
}
