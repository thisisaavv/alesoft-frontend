import { useQuery } from "@tanstack/react-query";
import { getSeveralDiscounts } from "@/lib/requests/discounts";

export function useGetSeveralDiscounts(filters?: any) {
	return useQuery({
		queryKey: ["discounts"],
		queryFn: () => getSeveralDiscounts(filters),
	});
}
