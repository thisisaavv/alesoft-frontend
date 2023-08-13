import { useQuery } from "@tanstack/react-query";

import { getCashRegister } from "@/lib/requests/cash-registers";

export function useGetCashRegister(id: string) {
	return useQuery({
		queryKey: ["cash-registers", id],
		queryFn: () => getCashRegister(id),
	});
}
