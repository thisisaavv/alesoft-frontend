import { useMutation } from "@tanstack/react-query";

import { deleteSeveralPurchases } from "@/lib/requests/purchases";

export function useDeleteSeveralPurchases() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralPurchases(data),
	});
}
