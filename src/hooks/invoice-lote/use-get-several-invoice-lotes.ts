import { useQuery } from "@tanstack/react-query";

import { getSeveralInvoiceLotes } from "@/lib/requests/invoice-lotes";

export function useGetSeveralInvoiceLotes(filters?: any) {
	return useQuery({
		queryKey: ["invoice-lotes"],
		queryFn: () => getSeveralInvoiceLotes(filters),
	});
}
