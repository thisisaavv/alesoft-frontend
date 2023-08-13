import { useMutation } from "@tanstack/react-query";

import { updateUser } from "@/lib/requests/users";

export function useUpdateUser() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateUser(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["users"], ["users", variables.id], ["user-auth"]],
		}),
	});
}
