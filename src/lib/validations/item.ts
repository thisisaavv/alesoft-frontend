import * as z from "zod";
import { genericSchema } from "./generic";

export const itemSchema = z
	.object({
		created_by: z.string().optional().nullable(),
		enabled: z.boolean().optional(),
		name: z.string().min(2).max(100),
		description: z.string().optional(),
		price: z.coerce.number().min(0),
		quantity: z.coerce.number().min(0).nonnegative(),
		category_id: z.string().uuid().optional().nullable(),
		images: z.array(z.string().url()).optional(),
		tax_id: z.string().uuid().optional().nullable(),
		provider_id: z.string().uuid().optional().nullable(),
		inventory_id: z.string().uuid(),
		menu_id: z.string().uuid().optional().nullable(),
	})
	.merge(genericSchema.partial());

export type Item = z.infer<typeof itemSchema>;
