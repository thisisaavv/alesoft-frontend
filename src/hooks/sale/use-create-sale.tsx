import { useMutation } from "@tanstack/react-query";

import { createSale } from "@/lib/requests/sale";

export function useCreateSale() {
	return useMutation({
		mutationFn: (data: any) => createSale(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: [["sales"], ["sales", variables.id], ["items"], ["invoice-lotes"]],
		}),
	});
}
