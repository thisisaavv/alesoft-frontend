import { useMutation } from "@tanstack/react-query";

import { updateCompany } from "@/lib/requests/companies";

export function useUpdateCompany() {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) => updateCompany(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["companies"], ["company", variables.id]],
		}),
	});
}
