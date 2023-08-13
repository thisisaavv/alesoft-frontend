import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "@/lib/requests/employees";

export function useGetEmployee(id: string) {
	return useQuery(["employee", id], async () => await getEmployee(id));
}
