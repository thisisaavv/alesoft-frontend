import { useMutation } from "@tanstack/react-query";

import { updateTax } from "@/lib/requests/taxes";

export function useUpdateTax() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateTax(id, data),
		onMutate: async (variables) => ({
			method: "PUT",
			variables,
			queries: [["taxes"], ["taxes", variables.id]],
		}),
	});
}
