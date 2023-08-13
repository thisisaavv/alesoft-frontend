import { useQuery } from "@tanstack/react-query";

import { getSeveralParameters } from "@/lib/requests/parameters";

export function useGetSeveralParameters(filters?: any) {
	return useQuery({
		queryKey: ["parameters"],
		queryFn: () => getSeveralParameters(filters),
	});
}
