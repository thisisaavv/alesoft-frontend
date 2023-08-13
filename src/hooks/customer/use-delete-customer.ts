import { useMutation } from "@tanstack/react-query";

import { deleteCustomerById } from "@/lib/requests/customers";
import { queryClient } from "@/components/providers";

export function useDeleteCustomer() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteCustomerById(id),
		onSuccess: (data, variables, context) => {
			queryClient.refetchQueries(["customers"]);
		},
	});
}
