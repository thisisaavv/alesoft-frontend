import { useMutation } from "@tanstack/react-query";
import { deleteSeveralDiscounts } from "@/lib/requests/discounts";

export function useDeleteSeveralDiscounts() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralDiscounts(data),
	});
}
