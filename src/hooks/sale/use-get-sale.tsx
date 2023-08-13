import { useQuery } from "@tanstack/react-query";
import { getSale } from "@/lib/requests/sale";

export function useGetSale(id: string) {
	return useQuery({
		queryKey: ["sales", id],
		queryFn: () => getSale(id),
	});
}
