import { useMutation } from "@tanstack/react-query";

import { createItemCategory } from "@/lib/requests/categories";

export function useCreateItemCategory() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createItemCategory(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: [["item-categories"]],
		}),
	});
}
