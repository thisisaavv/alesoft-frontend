import { useMutation } from "@tanstack/react-query";
import { deleteSeveralUsers } from "@/lib/requests/users";

export function useDeleteSeveralUsers() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralUsers(data),
	});
}
