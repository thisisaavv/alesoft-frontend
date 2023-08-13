import { BackofficeConfig } from "../types";

export const backofficeConfig: BackofficeConfig = {
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
			title: "Compañías",
			href: "/company/list",
		},
		{
			title: "Parámetros",
			href: "/parameter/list",
		},
		{
			title: "Inventarios",
			href: "/inventory/list",
		},
	],
};
