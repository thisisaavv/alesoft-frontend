import { useQuery } from "@tanstack/react-query";

import { getSeveralItemCategories } from "@/lib/requests/categories";

export function useGetSeveralItemCategories(filters?: any) {
	return useQuery({
		queryKey: ["item-categories"],
		queryFn: () => getSeveralItemCategories(filters),
	});
}
