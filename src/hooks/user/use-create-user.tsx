import { useMutation } from "@tanstack/react-query";

import { createUser } from "@/lib/requests/users";

export function useCreateUser() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createUser(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: ["users"],
		}),
	});
}
