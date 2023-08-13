import { useMutation } from "@tanstack/react-query";

import { deleteItemById } from "@/lib/requests/items";

export function useDeleteItem() {
	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteItemById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["items"], ["items", variables.id]],
		}),
	});
}
