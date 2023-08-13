import { resetPassword } from "@/lib/requests/auth";

import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
	return useMutation({
		mutationFn: ({ new_password, token }: any) => resetPassword({ new_password, token }),
		onMutate: (variables) => ({
			variables,
			method: "POST",
			message: "Se ha cambiado la contraseña de tu cuenta",
		}),
	});
}
