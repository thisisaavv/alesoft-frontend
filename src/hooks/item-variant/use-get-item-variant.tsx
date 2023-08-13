import { useQuery } from "@tanstack/react-query";

import { getItemVariant } from "@/lib/requests/variants";

export function useGetItemVariant(id: string) {
	return useQuery({
		queryKey: ["item-variants", id],
		queryFn: () => getItemVariant(id),
	});
}
