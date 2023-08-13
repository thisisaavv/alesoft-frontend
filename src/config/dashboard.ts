import { DashboardConfig } from "../types";

export const dashboardConfig: DashboardConfig = {
	mainNav: [
		{
			title: "Acerca de",
			href: "/about",
		},
		{
			title: "Documentación",
			href: "/docs",
		},
		{
			title: "Guías",
			href: "/guides",
		},
	],
	sidebarNav: [
		{
			title: "Inicio",
			href: "/dashboard",
			permission: "dashboard_permission",
			icon: "home",
		},
		{
			title: "Facturación",
			href: "/pos/overview",
			icon: "dollar",
			items: [
				{
					title: "Resumen",
					permission: "pos_permission",
					href: "/pos/overview",
				},
				{
					title: "Terminal Virtual",
					permission: "terminals_permission",
					href: "/pos/terminal",
				},
				{
					title: "Terminal Virtual Restaurante",
					permission: "terminals_permission",
					href: "/terminal/checkout",
				},
				{
					title: "Apertura de Caja",
					// permission: "cash_registers_permission",
					href: "/pos/cash-opening",
				},
			],
		},
		{
			title: "Ordenes",
			icon: "bell",
			permission: "orders_permission",
			href: "/order/list",
		},
		{
			title: "Inventario",
			href: "/item/list",
			icon: "tag",
			items: [
				{
					title: "Productos",
					permission: "inventories_permission",
					href: "/item/list",
				},
				{
					title: "Menús",
					permission: "menus_permission",
					href: "/menu/list",
					icon: "menu",
				},
				{
					title: "Librería de Imágenes",
					permission: "images_permission",
					href: "/image/list",
				},
				{
					title: "Categorías",
					permission: "categories_permission",
					href: "/category/list",
				},
				// {
				// 	title: "Modificadores",
				// 	permission: "items_modifiers_permission",
				// 	href: "/modifier/list",
				// },
				// {
				// 	title: "Variantes",
				// 	permission: "items_variations_permission",
				// 	href: "/variant/list",
				// },
				{
					title: "Descuentos",
					permission: "discounts_permission",
					href: "/discount/list",
				},
				{
					title: "Impuestos",
					permission: "taxes_permission",
					href: "/tax/list",
				},
				// {
				// 	title: "Unidades",
				// 	permission: "units_permission",
				// 	href: "/unit/list",
				// },
			],
		},
		{
			title: "Equipo",
			href: "/employee/list",
			icon: "employee",
			items: [
				{
					title: "Empleados",
					permission: "employees_permission",
					href: "/employee/list",
				},
				{
					title: "Usuarios",
					permission: "users_permission",
					href: "/user/list",
				},
				{
					title: "Permisos",
					permission: "user_roles_permission",
					href: "/permission/list",
				},
				{
					title: "Planilla",
					disabled: true,
					permission: "payrolls_permission",
					href: "/payroll/list",
				},
				{
					title: "Empleos",
					permission: "jobs_permission",
					href: "/job/list",
				},
			],
		},
		{
			title: "Clientes",
			permission: "customers_permission",
			href: "/customer/list",
			icon: "persons",
		},
		{
			title: "Proveedores",
			permission: "providers_permission",
			href: "/provider/list",
			icon: "truck",
		},
		{
			title: "Transacciones",
			permission: "transactions_permission",
			href: "/transaction/list",
		},
		{
			title: "Compras",
			permission: "purchases_permission",
			href: "/purchase/list",
			icon: "shoppigBag",
		},
		{
			title: "Ventas",
			permission: "sales_permission",
			href: "/sale/list",
			icon: "badgePercent",
		},
		{
			title: "Facturas",
			// permission: "invoices_permission",
			href: "/invoices",
		},
		{
			title: "Aperturas de Cajas",
			href: "/cash-registers/list",
			icon: "piggyBank",
		},
		// {
		// title: "Reportes",
		// permission: "reports_permission",
		// href: "/report/sales",
		// items: [
		// {
		// 	title: "Ventas",
		// 	disabled: true,
		// 	permission: "sales_permission",
		// 	href: "/report/sales",
		// },
		// {
		// 	title: "Compras",
		// 	permission: "purchases_permission",
		// 	disabled: true,
		// 	href: "/report/purchases",
		// },
		// {
		// 	title: "Inventario",
		// 	disabled: true,
		// 	href: "/report/inventory",
		// },
		// ],
		// },
	],
};
