import { changePassword } from "@/lib/requests/auth";

import { useMutation } from "@tanstack/react-query";

export function useChangePassword() {
	return useMutation({
		mutationFn: ({ password }: any) => changePassword({ password }),
		onMutate: (variables) => ({
			variables,
			method: "POST",
			message: "Se ha cambiado la contraseña de tu cuenta",
		}),
	});
}
