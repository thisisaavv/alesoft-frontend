import { useMutation } from "@tanstack/react-query";

import { deleteSeveralItemCategories } from "@/lib/requests/categories";

export function useDeleteSeveralItemCategories() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralItemCategories(data),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["item-categories"]],
		}),
	});
}
