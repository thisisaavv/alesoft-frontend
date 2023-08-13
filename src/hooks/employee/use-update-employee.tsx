import { useMutation } from "@tanstack/react-query";

import { updateEmployee } from "@/lib/requests/employees";

export function useUpdateEmployee() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateEmployee(id, data),
		onMutate: (variables) => ({
			variables,
			method: "PUT",
			queries: ["user-auth"],
		}),
	});
}
