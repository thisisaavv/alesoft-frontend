import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/providers";
import { createInventory } from "@/lib/requests/inventories";

export function useCreateInventory() {
	return useMutation({
		mutationFn: (data: any) => createInventory(data),
		onSuccess(data, variables, context) {
			queryClient.refetchQueries(["inventories"]);
		},
	});
}
