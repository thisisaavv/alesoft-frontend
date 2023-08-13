import { useMutation } from "@tanstack/react-query";

import { updateDiscount } from "@/lib/requests/discounts";

export function useUpdateDiscount() {
	return useMutation({
		mutationFn: ({ id, data }: any) => updateDiscount(id, data),
		onMutate: (variables) => ({
			method: "PUT",
			variables,
			queries: [["discounts"], ["discounts", variables.id]],
		}),
	});
}
