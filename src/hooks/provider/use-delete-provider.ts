import { useMutation } from "@tanstack/react-query";

import { deleteProviderById } from "@/lib/requests/providers";

export function useDeleteProvider() {
	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteProviderById(id),
		onMutate: async (variables) => ({
			method: "DELETE",
			variables,
			queries: ["providers"],
		}),
	});
}
