import { useQuery } from "@tanstack/react-query";

import { getMenu } from "@/lib/requests/menus";

export function useGetMenu(id: string) {
	return useQuery({
		queryKey: ["menus", id],
		queryFn: () => getMenu(id),
	});
}
