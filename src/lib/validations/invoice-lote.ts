import * as z from "zod";
import { genericSchema } from "./generic";

export const invoiceSchema = z.object({}).merge(genericSchema.partial());

export type Invoice = z.infer<typeof invoiceSchema>;
