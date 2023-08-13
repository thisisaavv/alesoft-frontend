import * as z from "zod";
import { genericSchema } from "./generic";

export const transactionSchema = z
	.object({
		// created_by: z.string().optional(),
		amount: z.coerce.number(),
		type: z.enum(["INCOME", "EXPENSE"]).nullable(),
		sub_type: z.string().optional(),
		description: z.string(),
	})
	.merge(genericSchema.partial());

export type Transaction = z.infer<typeof transactionSchema>;
