import { useMutation } from "@tanstack/react-query";

import { deleteSeveralItemModifiers } from "@/lib/requests/modifiers";

export function useDeleteSeveralItemCategories() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralItemModifiers(data),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["item-modifiers"]],
		}),
	});
}
