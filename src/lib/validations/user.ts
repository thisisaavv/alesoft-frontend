import * as z from "zod";
import { genericSchema } from "./generic";

const password = z
	.string({
		required_error: "La contraseña es obligatoria",
	})
	.min(8, {
		message: "La contraseña debe tener al menos 8 caracteres",
	})
	.max(100, {
		message: "La contraseña debe tener menos de 100 caracteres",
	})
	.regex(new RegExp(".*[A-Z].*"), {
		message: "La contraseña debe tener al menos una letra en mayúsculas",
	})
	.regex(new RegExp(".*[a-z].*"), {
		message: "La contraseña debe tener al menos una letra en minúsculas",
	})
	.regex(new RegExp(".*\\d.*"), {
		message: "La contraseña debe tener al menos un número",
	})
	.regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
		message: "La contraseña debe tener al menos un caracter especial",
	});

export const userSchema = z
	.object({
		enabled: z.boolean().optional(),
		username: z
			.string({
				required_error: "El nombre de usuario es obligatorio",
			})
			.trim(),
		employee_id: z
			.string({
				required_error: "El empleado es obligatorio",
			})
			.trim()
			.uuid({
				message: "Ingrese un ID de empleado válido",
			}),
		user_role_id: z
			.string({
				required_error: "El empleado es obligatorio",
			})
			.trim()
			.uuid({
				message: "Ingrese un ID de empleado válido",
			}),
		email: z
			.string({
				required_error: "El correo electrónico es obligatorio",
			})
			.trim()
			.email({
				message: "Ingrese un correo electrónico válido",
			})
			.nonempty({
				message: "Ingrese un correo electrónico",
			}),
		password: z.string().nonempty({
			message: "Ingrese una contraseña",
		}),
		verified: z.boolean().default(false).optional(),
	})
	.merge(genericSchema);

export const userSignInSchema = z.object({
	identifier: z
		.string({
			required_error: "Este campo es obligatorio",
		})
		.trim(),
	password: z.string({
		required_error: "Este campo es obligatorio",
	}),
});

export const userRecoverAccountSchema = userSchema.pick({ email: true });
export const userResetPasswordSchema = z
	.object({
		password,
		confirm_password: password,
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Las contraseñas no coinciden",
		path: ["confirm_password"],
	});

export const userCreateSchema = userSchema
	.extend({
		password,
		confirm_password: password,
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Las contraseñas no coinciden",
		path: ["confirm_password"],
	});

export type User = z.infer<typeof userSchema>;
export type UserSignIn = z.infer<typeof userSignInSchema>;
export type UserRecoverAccount = z.infer<typeof userRecoverAccountSchema>;
export type UserUpdatePassword = z.infer<typeof userResetPasswordSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserWithouthPassword = Omit<User, "password">;
