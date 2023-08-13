import { useMutation } from "@tanstack/react-query";

import { deleteSeveralJobs } from "@/lib/requests/jobs";

export function useDeleteSeveralJobs() {
	return useMutation({
		mutationFn: ({ ids }: { ids: string[] }) => deleteSeveralJobs(ids),
		onMutate: (variables) => ({
			method: "DELETE",
			variables,
			queries: [["jobs"]],
		}),
	});
}
