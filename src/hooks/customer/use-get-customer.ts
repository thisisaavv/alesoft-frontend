import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "@/lib/requests/customers";

export function useGetCustomer(id: string) {
	return useQuery(["customer", id], async () => await getCustomer(id));
}
