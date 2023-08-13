import * as z from "zod";
import { genericSchema } from "./generic";

export const parameterSchema = z
	.object({
		enabled: z.boolean().optional(),
		code: z.string().min(1).max(255),
		name: z.string().min(1).max(255),
		description: z.string().min(1),
		value: z.string().min(1).max(500),
	})
	.merge(genericSchema.partial());

export type Parameter = z.infer<typeof parameterSchema>;
