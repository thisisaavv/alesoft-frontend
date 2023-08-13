import { useMutation } from "@tanstack/react-query";

import { createParameter } from "@/lib/requests/parameters";

export function useCreateParameter() {
	return useMutation({
		mutationFn: (data: any) => createParameter(data),
		onMutate: async (variables) => ({
			method: "POST",
			variables,
			queries: ["parameters"],
		}),
	});
}
