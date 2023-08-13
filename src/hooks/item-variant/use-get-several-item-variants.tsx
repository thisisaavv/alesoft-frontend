import { useQuery } from "@tanstack/react-query";

import { getSeveralItemVariants } from "@/lib/requests/variants";

export function useGetSeveralItemVariants(filters?: any) {
	return useQuery({
		queryKey: ["item-variants"],
		queryFn: () => getSeveralItemVariants(filters),
	});
}
