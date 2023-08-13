import * as z from "zod";
import { genericSchema } from "./generic";

export const saleItemsSchema = z.object({
	item_id: z.string().uuid(),
	price: z.number().min(0).nonnegative(),
	quantity: z.number().min(1).nonnegative(),
	item_modifier_id: z.string().uuid().optional(),
	item_variant_id: z.string().uuid().optional(),
	discount_id: z.string().uuid().optional(),
	note: z.string().max(500).optional(),
});

export const saleSchema = z
	.object({
		created_by: z.string().uuid().optional(),
		code: z.string().min(4).max(10).optional(),
		customer_id: z.string().uuid().optional(),
		tax_id: z.string().uuid().optional(),
		discount_id: z.string().uuid().optional(),
		payment_method: z.enum(["CASH", "CARD", "TRANSFER", "OTHER"]).optional(),
		status: z.enum(["PENDING", "PAID", "CANCELLED"]).optional(),
		subtotal: z.coerce.number().min(0).nonnegative().optional(),
		total: z.coerce.number().min(1).nonnegative().optional(),
		note: z.string().max(500).optional(),
		sale_items: z.array(saleItemsSchema).optional(),
	})
	.merge(genericSchema.partial());

export type Sale = z.infer<typeof saleSchema>;
