import * as z from "zod";
import { genericSchema } from "./generic";

export const invoiceSchema = z
	.object({
		file_url: z.string().url(),
		cai_number: z.string().min(1).max(50),
		invoice_lote_id: z.string().uuid(),
		sale_id: z.string().uuid(),
	})
	.merge(genericSchema.partial());

export type Invoice = z.infer<typeof invoiceSchema>;
