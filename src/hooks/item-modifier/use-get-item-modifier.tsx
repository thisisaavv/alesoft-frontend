import { useQuery } from "@tanstack/react-query";

import { getItemModifier } from "@/lib/requests/modifiers";

export function useGetItemModifier(id: string) {
	return useQuery({
		queryKey: ["item-modifiers", id],
		queryFn: () => getItemModifier(id),
	});
}
