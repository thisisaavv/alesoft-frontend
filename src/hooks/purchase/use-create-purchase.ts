import { useMutation } from "@tanstack/react-query";

import { createPurchase } from "@/lib/requests/purchases";

export function useCreatePurchase() {
	return useMutation({
		mutationFn: (data: any) => createPurchase(data),
		onMutate: async (variables) => ({
			method: "POST",
			variables,
			queries: ["purchases"],
		}),
	});
}
