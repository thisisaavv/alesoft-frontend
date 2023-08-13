import { useMutation } from "@tanstack/react-query";

import { updateItemModifier } from "@/lib/requests/modifiers";

export function useUpdateItemModifier() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateItemModifier(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["item-modifiers"], ["item-modifiers", variables.id]],
		}),
	});
}
