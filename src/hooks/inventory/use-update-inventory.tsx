import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/providers";
import { updateInventory } from "@/lib/requests/inventories";

export function useUpdateInventory() {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) => updateInventory(id, data),
		onSuccess: (data, variables, context) => {
			queryClient.refetchQueries(["inventories"]);
			queryClient.refetchQueries(["inventory", variables.id]);
		},
	});
}
