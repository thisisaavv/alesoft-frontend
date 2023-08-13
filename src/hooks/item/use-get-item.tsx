import { useQuery } from "@tanstack/react-query";

import { getItem } from "@/lib/requests/items";

export function useGetItem(id: string) {
	return useQuery({
		queryKey: ["items", id],
		queryFn: () => getItem(id),
	});
}
