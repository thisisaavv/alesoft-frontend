import { useQuery } from "@tanstack/react-query";

import { getTransaction } from "@/lib/requests/transactions";

export function useGetTransaction(id: string) {
	return useQuery({
		queryKey: ["transactions", id],
		queryFn: () => getTransaction(id),
	});
}
