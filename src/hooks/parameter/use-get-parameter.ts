import { useQuery } from "@tanstack/react-query";

import { getParameter } from "@/lib/requests/parameters";

export function useGetParameter(id: string) {
	return useQuery({
		queryKey: ["parameters", id],
		queryFn: () => getParameter(id),
	});
}
