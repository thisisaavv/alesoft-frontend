import { useMutation } from "@tanstack/react-query";

import { deleteSeveralTransactions } from "@/lib/requests/transactions";

export function useDeleteSeveralTransactions() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralTransactions(data),
	});
}
