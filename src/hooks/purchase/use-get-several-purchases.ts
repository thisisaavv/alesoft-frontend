import { useQuery } from "@tanstack/react-query";

import { getSeveralPurchases } from "@/lib/requests/purchases";

export function useGetSeveralPurchases(filters?: any) {
	return useQuery({
		queryKey: ["purchases"],
		queryFn: () => getSeveralPurchases(filters),
	});
}
