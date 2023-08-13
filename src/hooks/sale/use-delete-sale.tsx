import { useMutation } from "@tanstack/react-query";

import { deleteSaleById } from "@/lib/requests/sale";

export function useDeleteSale() {
	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteSaleById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["sales"], ["sales", variables.id]],
		}),
	});
}
