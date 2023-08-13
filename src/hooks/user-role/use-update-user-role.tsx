import { useMutation } from "@tanstack/react-query";

import { updateUserRole } from "@/lib/requests/user-roles";

export function useUpdateUserRole() {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: any }) => updateUserRole(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["user-roles"], ["user-roles", variables.id]],
		}),
	});
}
