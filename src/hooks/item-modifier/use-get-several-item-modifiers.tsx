import { useQuery } from "@tanstack/react-query";

import { getSeveralItemModifiers } from "@/lib/requests/modifiers";

export function useGetSeveralItemModifiers(filters?: any) {
	return useQuery({
		queryKey: ["item-modifiers"],
		queryFn: () => getSeveralItemModifiers(filters),
	});
}
