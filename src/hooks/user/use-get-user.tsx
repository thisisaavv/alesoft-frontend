import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/requests/users";

export function useGetUser(id: string) {
	return useQuery({
		queryKey: ["users", id],
		queryFn: () => getUser(id),
	});
}
