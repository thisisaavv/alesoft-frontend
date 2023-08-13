import { z } from "zod";

export const genericSchema = z.object({
	id: z.string().uuid().optional(),
	created_at: z.date().or(z.string()).optional(),
	updated_at: z.date().or(z.string()).optional(),
});
