import { useMutation } from "@tanstack/react-query";

import { deleteItemModifierById } from "@/lib/requests/modifiers";

export function useDeleteItemModifier() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteItemModifierById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["item-modifiers"], ["item-modifiers", variables.id]],
		}),
	});
}
