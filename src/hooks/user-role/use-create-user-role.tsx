import { useMutation } from "@tanstack/react-query";

import { createUserRole } from "@/lib/requests/user-roles";

export function useCreateUserRole() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createUserRole(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: ["user-roles"],
		}),
	});
}
