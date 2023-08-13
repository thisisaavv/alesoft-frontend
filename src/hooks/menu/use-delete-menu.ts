import { useMutation } from "@tanstack/react-query";

import { deleteMenuById } from "@/lib/requests/menus";

export function useDeleteMenu() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteMenuById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["menus"], ["menus", variables.id]],
		}),
	});
}
