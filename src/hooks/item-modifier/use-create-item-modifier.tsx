import { useMutation } from "@tanstack/react-query";

import { createItemModifier } from "@/lib/requests/modifiers";

export function useCreateItemModifier() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createItemModifier(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: [["item-modifiers"]],
		}),
	});
}
