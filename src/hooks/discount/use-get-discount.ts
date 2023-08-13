import { useQuery } from "@tanstack/react-query";
import { getDiscount } from "@/lib/requests/discounts";

export function useGetDiscount(id: string) {
	return useQuery(["discount", id], async () => await getDiscount(id));
}
