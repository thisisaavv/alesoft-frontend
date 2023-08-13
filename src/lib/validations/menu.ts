import * as z from "zod";
import { genericSchema } from "./generic";

export const menuSchema = z
	.object({
		name: z.string().min(1).max(255),
		description: z.string().min(1).optional(),
		// image_url: z.string().url().optional(),
	})
	.merge(genericSchema.partial());

export type Menu = z.infer<typeof menuSchema>;
