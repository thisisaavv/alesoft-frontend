import { signIn } from "@/lib/requests/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignIn() {
	return useMutation({
		mutationFn: ({ identifier, password }: any) => signIn({ identifier, password }),
	});
}
