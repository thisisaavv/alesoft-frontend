import * as z from "zod";
import { genericSchema } from "./generic";

export const purchaseItemsSchema = z.object({
	item_id: z.string().uuid(),
	price: z.coerce.number().min(0).nonnegative(),
	note: z.coerce.string().max(500).optional(),
	quantity: z.coerce.number().min(1).nonnegative(),
	total: z.coerce.number().min(0).nonnegative().optional(),
});

export const purchaseSchema = z
	.object({
		created_by: z.string().uuid().optional(),
		code: z.string().min(4).max(10).optional(),
		provider_id: z.string().uuid().optional(),
		tax_id: z.string().uuid().optional(),
		expected_date: z.coerce.date().optional(),
		payment_method: z.enum(["CASH", "CARD", "TRANSFER", "OTHER"]).optional(),
		status: z.enum(["PENDING", "PAID", "CANCELLED"]).optional(),
		subtotal: z.coerce.number().min(0).nonnegative().optional(),
		total: z.coerce.number().min(0).nonnegative().optional(),
		note: z.string().max(500).optional(),
		purchase_items: z.array(purchaseItemsSchema).optional(),
	})
	.merge(genericSchema.partial());

export type Purchase = z.infer<typeof purchaseSchema>;
