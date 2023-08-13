import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/lib/requests/inventories";

export function useGetInventoryItems(id: string) {
	return useQuery(["inventory-items", id], async () => await getInventoryItems(id));
}
