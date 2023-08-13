import { useQuery } from "@tanstack/react-query";

import { getSeveralItems } from "@/lib/requests/items";

export function useGetSeveralItems(filters?: any) {
	return useQuery({
		queryKey: ["items"],
		queryFn: () => getSeveralItems(filters),
	});
}
