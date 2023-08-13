import { useQuery } from "@tanstack/react-query";

import { getSeveralProviders } from "@/lib/requests/providers";

export function useGetSeveralProviders(filters?: any) {
	return useQuery({
		queryKey: ["providers"],
		queryFn: () => getSeveralProviders(filters),
	});
}
