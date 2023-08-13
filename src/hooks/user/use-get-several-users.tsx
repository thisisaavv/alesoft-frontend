import { useQuery } from "@tanstack/react-query";
import { getSeveralUsers } from "@/lib/requests/users";

export function useGetSeveralUsers(filters?: any) {
	return useQuery({
		queryKey: ["users"],
		queryFn: () => getSeveralUsers(filters),
	});
}
