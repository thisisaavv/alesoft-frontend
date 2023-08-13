import * as z from "zod";
import { genericSchema } from "./generic";

export const cashRegisterSchema = z
	.object({
		opening_amount: z.coerce.number().min(1).nonnegative(),
		closing_amount: z.coerce.number().min(1).nonnegative().optional(),
		total_sales: z.coerce.number().min(1).nonnegative().optional(),
		note: z.string().optional(),
		created_by: z.string().optional(),
		// closing_date: z.coerce.date().optional(),
		// terminal_id: z.string().uuid().optional(),
	})
	.merge(genericSchema.partial());

export type CashRegister = z.infer<typeof cashRegisterSchema>;
