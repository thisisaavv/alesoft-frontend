import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/components/providers";
import { deleteEmployeeById } from "@/lib/requests/employees";

export function useDeleteEmployee() {
	return useMutation({
		mutationFn: ({ id }: any) => deleteEmployeeById(id),
		onSuccess: (data, variables, context) => {
			queryClient.refetchQueries({ queryKey: ["employees"] });
		},
	});
}
