import { useMutation } from "@tanstack/react-query";

import { createProvider } from "@/lib/requests/providers";

export function useCreateProvider() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createProvider(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: ["providers"],
		}),
	});
}
