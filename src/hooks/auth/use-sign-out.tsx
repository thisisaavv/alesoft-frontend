import { signOut } from "@/lib/requests/auth";
import { useQuery } from "@tanstack/react-query";

export function useSignOut() {
	return useQuery(["signOut"], signOut, {
		onSuccess: () => {
			window.localStorage.removeItem("token");
			window.location.href = "/";
		},
	});
}
