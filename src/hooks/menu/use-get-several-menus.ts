import { useQuery } from "@tanstack/react-query";

import { getSeveralMenus } from "@/lib/requests/menus";

export function useGetSeveralMenus(filters?: any) {
	return useQuery({
		queryKey: ["menus"],
		queryFn: () => getSeveralMenus(filters),
	});
}
