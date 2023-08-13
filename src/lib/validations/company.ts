import * as z from "zod";
import { genericSchema } from "./generic";

export const companySchema = z
	.object({
		enabled: z.boolean().optional(),
		name: z.string().min(1).max(255),
		bussiness_id: z.string().min(1).max(255),
		logo_url: z.string().url().optional().nullable(),
		emails: z.array(z.string().email()).optional(),
		phones: z.array(z.string().min(8).max(14)).optional(),
		country: z.string().min(2).max(100).optional(),
		state: z.string().min(2).max(100).optional(),
		city: z.string().min(2).max(100).optional(),
		street: z.string().min(2).max(100),
		website_url: z.string().url().optional().nullable(),
	})
	.merge(genericSchema.partial());

export type Company = z.infer<typeof companySchema>;
