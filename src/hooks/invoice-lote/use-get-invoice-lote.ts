import { useQuery } from "@tanstack/react-query";

import { getInvoiceLote } from "@/lib/requests/invoice-lotes";

export function useGetInvoiceLote(id: string) {
	return useQuery({
		queryKey: ["invoice-lotes", id],
		queryFn: () => getInvoiceLote(id),
	});
}
