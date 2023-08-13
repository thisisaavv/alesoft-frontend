import { useMutation } from "@tanstack/react-query";

import { deleteCashRegisterById } from "@/lib/requests/cash-registers";

export function useDeleteCashRegister() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteCashRegisterById(id),
		onMutate: async (variables) => ({
			method: "DELETE",
			variables,
			queries: [["cash-registers"], ["cash-registers", variables.id]],
		}),
	});
}
