import { useQuery } from "@tanstack/react-query";

import { getSeveralTransactions } from "@/lib/requests/transactions";

export function useGetSeveralTransactions(filters?: any) {
	return useQuery({
		queryKey: ["transactions"],
		queryFn: () => getSeveralTransactions(filters),
	});
}
