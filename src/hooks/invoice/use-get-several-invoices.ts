import { useQuery } from "@tanstack/react-query";

import { getSeveralInvoices } from "@/lib/requests/invoices";

export function useGetSeveralInvoices(filters?: any) {
	return useQuery({
		queryKey: ["invoices"],
		queryFn: () => getSeveralInvoices(filters),
	});
}
