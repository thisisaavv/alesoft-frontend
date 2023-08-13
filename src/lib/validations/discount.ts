import * as z from "zod";
import { genericSchema } from "./generic";

export const discountSchema = z
	.object({
		name: z.string().min(1).max(255),
		note: z.string().min(1).max(255).optional(),
		amount_type: z.enum(["PERCENTAGE", "FIXED"]).nullable(),
		amount: z.coerce.number().min(0).nonnegative(),
	})
	.merge(genericSchema.partial());

export type Discount = z.infer<typeof discountSchema>;
