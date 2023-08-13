import * as z from "zod";
import { genericSchema } from "./generic";

export const itemModifierOptionSchema = z
	.object({
		name: z.string().min(2).max(100),
		price: z.coerce.number().min(0).nonnegative(),
	})
	.merge(genericSchema.partial());

export const itemModifierSchema = z
	.object({
		name: z.string().min(2).max(100),
		options: z.array(itemModifierOptionSchema).nonempty(),
	})
	.merge(genericSchema.partial());

export type ItemModifier = z.infer<typeof itemModifierSchema>;
