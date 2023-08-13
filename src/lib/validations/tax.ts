import * as z from "zod";
import { genericSchema } from "./generic";

export const taxSchema = z
	.object({
		name: z.string().min(1).max(255),
		description: z.string().min(1).max(255).optional(),
		rate: z.coerce.number().min(0).max(100).nonnegative(),
	})
	.merge(genericSchema.partial());

export type Tax = z.infer<typeof taxSchema>;
