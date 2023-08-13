import { useMutation } from "@tanstack/react-query";

import { updateJob } from "@/lib/requests/jobs";

export function useUpdateJob() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateJob(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["jobs"], ["jobs", variables.id]],
		}),
	});
}
