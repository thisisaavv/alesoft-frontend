import { recoverAccount } from "@/lib/requests/auth";
import { useMutation } from "@tanstack/react-query";

export function useRecoverAccount() {
	return useMutation({
		mutationFn: ({ email }: { email: string }) => recoverAccount({ email }),
		onMutate: (variables) => ({
			method: "POST",
			variables,
			message: "Se ha enviado un correo electrónico para recuperar tu cuenta.",
		}),
	});
}
