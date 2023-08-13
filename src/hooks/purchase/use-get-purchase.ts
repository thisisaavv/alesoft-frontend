import { useQuery } from "@tanstack/react-query";

import { getPurchase } from "@/lib/requests/purchases";

export function useGetPurchase(id: string) {
	return useQuery({
		queryKey: ["purchases", id],
		queryFn: () => getPurchase(id),
	});
}
