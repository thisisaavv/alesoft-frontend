import { useMutation } from "@tanstack/react-query";
import { deleteSeveralEmployees } from "@/lib/requests/employees";

export function useDeleteSeveralEmployees() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralEmployees(data),
	});
}
