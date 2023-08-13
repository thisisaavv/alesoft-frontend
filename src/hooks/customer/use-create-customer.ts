import { useMutation } from "@tanstack/react-query";

import { createCustomer } from "@/lib/requests/customers";

export function useCreateCustomer() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createCustomer(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: ["customers"],
		}),
	});
}
