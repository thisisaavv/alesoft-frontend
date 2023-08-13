import { useMutation } from "@tanstack/react-query";

import { updateProvider } from "@/lib/requests/providers";

export function useUpdateProvider() {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) => updateProvider(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["providers"], ["providers", variables.id]],
		}),
	});
}
