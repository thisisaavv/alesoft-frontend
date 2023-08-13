import { useMutation } from "@tanstack/react-query";

import { deleteItemCategoryById } from "@/lib/requests/categories";

export function useDeleteItemCategory() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteItemCategoryById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["item-categories"], ["item-categories", variables.id]],
		}),
	});
}
