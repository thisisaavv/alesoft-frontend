import { useQuery } from "@tanstack/react-query";

import { getUserAuth } from "@/lib/requests/auth";

export function useUserAuth() {
	return useQuery(["user-auth"], async () => await getUserAuth());
}
