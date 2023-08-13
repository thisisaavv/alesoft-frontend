import * as z from "zod";
import { genericSchema } from "./generic";

export const inventorySchema = z
	.object({
		enabled: z.boolean().optional(),
		name: z.string().min(1).max(255),
		description: z.string().min(1).max(255),
	})
	.merge(genericSchema);

export type Inventory = z.infer<typeof inventorySchema>;
