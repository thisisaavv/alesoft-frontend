import { useMutation } from "@tanstack/react-query";

import { deleteJobById } from "@/lib/requests/jobs";

export function useDeleteJob() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteJobById(id),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["jobs"], ["jobs", variables.id]],
		}),
	});
}
