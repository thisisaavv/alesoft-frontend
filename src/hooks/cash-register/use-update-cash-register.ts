import { useMutation } from "@tanstack/react-query";

import { updateCashRegister } from "@/lib/requests/cash-registers";

export function useUpdateCashRegister() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateCashRegister(id, data),
		onMutate: async (variables) => ({
			method: "PUT",
			variables,
			queries: [["cash-registers"], ["cash-registers", variables.id]],
		}),
	});
}
