import { useMutation } from "@tanstack/react-query";

import { updateSeveralParameters } from "@/lib/requests/parameters";

export function useUpdateSeveralParameters() {
	return useMutation({
		mutationFn: ({ ids, data }: { ids: string[]; data: any }) =>
			updateSeveralParameters({ ids, data }),
		onMutate: async (variables) => ({
			method: "PUT",
			variables,
			queries: [["parameters"]],
		}),
	});
}
