import * as z from "zod";
import { genericSchema } from "./generic";

export const customerSchema = z
	.object({
		email: z.string().email().optional(),
		phone: z.string().min(8).max(14).optional(),
		first_name: z.string().min(2).max(100),
		middle_name: z.string().optional(),
		last_name: z.string().min(2).max(100),
		birthdate: z.coerce.date(),
		id_card: z.string().min(7).max(13),
		rtn: z.string().min(10).max(14).optional(),
		emails: z.array(z.string().email()).optional(),
		phones: z.array(z.string().min(8).max(14)).optional(),
		country: z.string().min(2).max(100),
		state: z.string().min(2).max(100),
		city: z.string().min(2).max(100),
		street: z.string().min(2).max(100),
		website_url: z.string().url().optional().nullable(),
	})
	.merge(genericSchema.partial());

export type Customer = z.infer<typeof customerSchema>;
