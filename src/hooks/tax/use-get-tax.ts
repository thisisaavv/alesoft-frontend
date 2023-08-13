import { useQuery } from "@tanstack/react-query";

import { getTax } from "@/lib/requests/taxes";

export function useGetTax(id: string) {
	return useQuery({
		queryKey: ["taxes", id],
		queryFn: () => getTax(id),
	});
}
