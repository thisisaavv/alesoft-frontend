import { useMutation } from "@tanstack/react-query";

import { deleteSeveralMenus } from "@/lib/requests/menus";

export function useDeleteSeveralMenus() {
	return useMutation({
		mutationFn: ({ ids }: { ids: string[] }) => deleteSeveralMenus(ids),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["menus"]],
		}),
	});
}
