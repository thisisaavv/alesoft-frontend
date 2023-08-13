import { useQuery } from "@tanstack/react-query";

import { getSeveralTaxes } from "@/lib/requests/taxes";

export function useGetSeveralTaxes(filters?: any) {
	return useQuery({
		queryKey: ["taxes"],
		queryFn: () => getSeveralTaxes(filters),
	});
}
