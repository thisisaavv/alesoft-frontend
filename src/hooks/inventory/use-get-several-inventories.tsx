import { useQuery } from "@tanstack/react-query";
import { getSeveralInventories } from "@/lib/requests/inventories";

export function useGetSeveralInventories(filters?: any) {
	return useQuery({
		queryKey: ["inventories"],
		queryFn: () => getSeveralInventories(filters),
	});
}
