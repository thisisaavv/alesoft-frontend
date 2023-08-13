import { DashboardConfig } from "../types";

export const settingsConfig: DashboardConfig = {
	mainNav: [],
	sidebarNav: [
		{
			title: "Perfil",
			href: "/settings/profile",
		},
		{
			title: "Cuenta",
			href: "/settings/account",
		},
		{
			title: "Apariencia",
			href: "/settings/appearance",
		},
		// {
		// 	title: "Notificaciones",
		// 	href: "/settings/notifications",
		// },
		{
			title: "Seguridad",
			href: "/settings/security",
		},
		// {
		// 	title: "Pantalla",
		// 	href: "/settings/display",
		// },
		// {
		// 	title: "Privacidad",
		// 	href: "/settings/privacy",
		// },
		{
			title: "Parámetros",
			href: "/settings/parameters",
		},
		{
			title: "Compañía",
			href: "/settings/company",
		},
		{
			title: "Facturación",
			href: "/settings/billing",
		},
		{
			title: "Copia de Seguridad",
			href: "/settings/backup",
		},
	],
};
