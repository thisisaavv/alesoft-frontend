import { useMutation } from "@tanstack/react-query";

import { createDiscount } from "@/lib/requests/discounts";

export function useCreateDiscount() {
	return useMutation({
		mutationFn: ({ data }: { data: any }) => createDiscount(data),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			queries: [["discounts"]],
		}),
	});
}
