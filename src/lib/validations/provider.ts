import * as z from "zod";
import { genericSchema } from "./generic";

export const providerSchema = z
	.object({
		enabled: z.boolean().optional(),
		name: z.string().min(2).max(255),
		bussiness_id: z.string().min(1).max(255).optional(),
		emails: z.array(z.coerce.string().email()).optional(),
		phones: z.array(z.coerce.string().min(8).max(14)).optional(),
		country: z.string().min(2).max(100).optional(),
		state: z.string().min(2).max(100).optional(),
		city: z.string().min(2).max(100).optional(),
		street: z.string().min(2).max(100),
		website_url: z.string().url().optional().nullable(),
	})
	.merge(genericSchema.partial());

export type Provider = z.infer<typeof providerSchema>;
