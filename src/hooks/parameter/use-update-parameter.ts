import { useMutation } from "@tanstack/react-query";

import { updateParameter } from "@/lib/requests/parameters";

export function useUpdateParameter() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateParameter(id, data),
		onMutate: async (variables) => ({
			method: "PUT",
			variables,
			queries: [["parameters"], ["parameters", variables.id]],
		}),
	});
}
