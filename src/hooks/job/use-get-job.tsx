import { useQuery } from "@tanstack/react-query";

import { getJob } from "@/lib/requests/jobs";

export function useGetJob(id: string) {
	return useQuery({
		queryKey: ["jobs", id],
		queryFn: () => getJob(id),
	});
}
