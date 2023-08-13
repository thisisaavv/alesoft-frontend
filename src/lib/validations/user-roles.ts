import * as z from "zod";
import { genericSchema } from "./generic";

export const userRoleSchema = z
	.object({
		name: z.string().trim(),
		dashboard_permission: z.boolean().optional(),
		jobs_permission: z.boolean().optional(),
		payrolls_permission: z.boolean().optional(),
		categories_permission: z.boolean().optional(),
		companies_permission: z.boolean().optional(),
		discounts_permission: z.boolean().optional(),
		invoices_permission: z.boolean().optional(),
		logs_permission: z.boolean().optional(),
		menus_permission: z.boolean().optional(),
		payments_permission: z.boolean().optional(),
		orders_items_permission: z.boolean().optional(),
		purchases_permission: z.boolean().optional(),
		orders_permission: z.boolean().optional(),
		providers_permission: z.boolean().optional(),
		taxes_permission: z.boolean().optional(),
		transactions_permission: z.boolean().optional(),
		description: z.string().trim().optional(),
		users_permission: z.boolean().optional(),
		user_roles_permission: z.boolean().optional(),
		employees_permission: z.boolean().optional(),
		customers_permission: z.boolean().optional(),
		inventories_permission: z.boolean().optional(),
		items_permission: z.boolean().optional(),
		sales_permission: z.boolean().optional(),
		terminals_permission: z.boolean().optional(),
		items_modifiers_permission: z.boolean().optional(),
		items_variations_permission: z.boolean().optional(),
		pos_permission: z.boolean().optional(),
	})
	.merge(genericSchema);

export type UserRole = z.infer<typeof userRoleSchema>;
