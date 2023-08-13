import { useMutation } from "@tanstack/react-query";

import { deleteSeveralInvoices } from "@/lib/requests/invoices";

export function useDeleteSeveralInvoices() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralInvoices(data),
	});
}
