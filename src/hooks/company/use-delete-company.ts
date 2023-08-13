import { useMutation } from "@tanstack/react-query";

import { deleteCompanyById } from "@/lib/requests/companies";

export function useDeleteCompany() {
	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteCompanyById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["companies"], ["company", variables.id]],
		}),
	});
}
