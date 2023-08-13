import { useMutation } from "@tanstack/react-query";

import { updateItemVariant } from "@/lib/requests/variants";

export function useUpdateItemVariant() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateItemVariant(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["item-variants"], ["item-variants", variables.id]],
		}),
	});
}
