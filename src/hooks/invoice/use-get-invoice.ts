import { useQuery } from "@tanstack/react-query";

import { getInvoice } from "@/lib/requests/invoices";

export function useGetInvoice(id: string) {
	return useQuery({
		queryKey: ["invoices", id],
		queryFn: () => getInvoice(id),
	});
}
