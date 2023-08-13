import { useQuery } from "@tanstack/react-query";

import { getSeveralUserRoles } from "@/lib/requests/user-roles";

export function useGetSeveralUserRoles(filters?: any) {
	return useQuery({
		queryKey: ["user-roles"],
		queryFn: () => getSeveralUserRoles(filters),
	});
}
