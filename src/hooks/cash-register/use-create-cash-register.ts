import { useMutation } from "@tanstack/react-query";

import { createCashRegister } from "@/lib/requests/cash-registers";

export function useCreateCashRegister() {
	return useMutation({
		mutationFn: (data: any) => createCashRegister(data),
		onMutate: async (variables) => ({
			method: "POST",
			variables,
			queries: ["cash-registers"],
		}),
	});
}
