import { useMutation } from "@tanstack/react-query";

import { updateMenu } from "@/lib/requests/menus";

export function useUpdateMenu() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateMenu(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["menus"], ["menus", variables.id]],
		}),
	});
}
