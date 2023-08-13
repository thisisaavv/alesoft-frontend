import { useMutation } from "@tanstack/react-query";

import { deleteParameterById } from "@/lib/requests/parameters";

export function useDeleteParameter() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteParameterById(id),
		onMutate: async (variables) => ({
			method: "DELETE",
			variables,
			queries: [["parameters"], ["parameters", variables.id]],
		}),
	});
}
