import { useMutation } from "@tanstack/react-query";

import { updateItemCategory } from "@/lib/requests/categories";

export function useUpdateItemCategory() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateItemCategory(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["item-categories"], ["item-categories", variables.id]],
		}),
	});
}
