import { useMutation } from "@tanstack/react-query";

import { createItem } from "@/lib/requests/items";

export function useCreateItem() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createItem(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: [["items"]],
		}),
	});
}
