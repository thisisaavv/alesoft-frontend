import { useQuery } from "@tanstack/react-query";

import { getSeveralCashRegisters } from "@/lib/requests/cash-registers";

export function useGetSeveralCashRegisters(filters?: any) {
	return useQuery({
		queryKey: ["cash-registers"],
		queryFn: () => getSeveralCashRegisters(filters),
	});
}
