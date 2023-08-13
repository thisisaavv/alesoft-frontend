import { useMutation } from "@tanstack/react-query";

import { deleteSeveralSales } from "@/lib/requests/sale";

export function useDeleteSeveralSale() {
	return useMutation({
		mutationFn: ({ ids }: { ids: any }) => deleteSeveralSales(ids),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["sales"], ["sales", variables.ids]],
		}),
	});
}
