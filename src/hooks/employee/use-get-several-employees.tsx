import { useQuery } from "@tanstack/react-query";
import { getSeveralEmployees } from "@/lib/requests/employees";

export function useGetSeveralEmployees(filters?: any) {
	return useQuery({
		queryKey: ["employees"],
		queryFn: () => getSeveralEmployees(filters),
	});
}
