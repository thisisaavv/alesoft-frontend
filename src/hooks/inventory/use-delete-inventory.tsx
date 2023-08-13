import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/providers";
import { deleteInventoryById } from "@/lib/requests/inventories";

export function useDeleteInventory() {
	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteInventoryById(id),
		onSuccess: (data, variables, context) => {
			queryClient.refetchQueries(["inventories"]);
			queryClient.refetchQueries(["inventory", variables.id]);
		},
	});
}
