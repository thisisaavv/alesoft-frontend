import { useMutation } from "@tanstack/react-query";

import { deleteSeveralUserRoles } from "@/lib/requests/user-roles";

export function useDeleteSeveralUserRoles() {
	return useMutation({
		mutationFn: ({ ids }: { ids: string[] }) => deleteSeveralUserRoles(ids),
	});
}
