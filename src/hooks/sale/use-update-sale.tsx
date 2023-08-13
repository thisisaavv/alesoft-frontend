import { useMutation } from "@tanstack/react-query";

import { updateSale } from "@/lib/requests/sale";

export function useUpdateSale() {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) => updateSale(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["sales"], ["sales", variables.id]],
		}),
	});
}
