import * as z from "zod";
import { genericSchema } from "./generic";

export const jobSchema = z
	.object({
		name: z.string().min(2).max(255),
		description: z.string().min(3),
	})
	.merge(genericSchema.partial());

export type Job = z.infer<typeof jobSchema>;
