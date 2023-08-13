import * as z from "zod";
import { genericSchema } from "./generic";

export const itemVariantSchema = z
	.object({
		name: z.string().min(2).max(255),
		options: z.array(z.string()) as any,
	})
	.merge(genericSchema.partial());

export type ItemVariant = z.infer<typeof itemVariantSchema>;
