import { useMutation } from "@tanstack/react-query";

import { createJob } from "@/lib/requests/jobs";

export function useCreateJob() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createJob(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: ["jobs"],
		}),
	});
}
