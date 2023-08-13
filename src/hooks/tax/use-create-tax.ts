import { useMutation } from "@tanstack/react-query";

import { createTax } from "@/lib/requests/taxes";

export function useCreateTax() {
	return useMutation({
		mutationFn: (data: any) => createTax(data),
		onMutate: async (variables) => ({
			method: "POST",
			variables,
			queries: ["taxes"],
		}),
	});
}
