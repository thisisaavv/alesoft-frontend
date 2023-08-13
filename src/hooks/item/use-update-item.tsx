import { useMutation } from "@tanstack/react-query";

import { updateItem } from "@/lib/requests/items";

export function useUpdateItem() {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) => updateItem(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["items"], ["items", variables.id]],
		}),
	});
}
