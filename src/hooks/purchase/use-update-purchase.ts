import { useMutation } from "@tanstack/react-query";

import { updatePurchase } from "@/lib/requests/purchases";

export function useUpdatePurchase() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updatePurchase(id, data),
		onMutate: async (variables) => ({
			method: "PUT",
			variables,
			queries: [["purchases"], ["purchases", variables.id]],
		}),
	});
}
