import * as z from "zod";

export const addressSchema = z.object({
	address: z
		.string()
		.trim()
		.min(2, {
			message: "La dirección debe tener al menos 2 caracteres",
		})
		.max(100, {
			message: "La dirección debe tener menos de 100 caracteres",
		}),
	country: z
		.string()
		.trim()
		.min(2, {
			message: "La dirección debe tener al menos 2 caracteres",
		})
		.max(100, {
			message: "La dirección debe tener menos de 100 caracteres",
		}),
	state: z
		.string()
		.trim()
		.min(2, {
			message: "La dirección debe tener al menos 2 caracteres",
		})
		.max(100, {
			message: "La dirección debe tener menos de 100 caracteres",
		}),
	city: z
		.string()
		.trim()
		.min(2, {
			message: "La dirección debe tener al menos 2 caracteres",
		})
		.max(100, {
			message: "La dirección debe tener menos de 100 caracteres",
		}),
});

export type Address = z.infer<typeof addressSchema>;
