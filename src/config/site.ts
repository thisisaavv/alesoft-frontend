import { SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
	name: "Alesoft",
	description: "An open source ERP for small and medium businesses.",
	url: process.env.NEXT_PUBLIC_APP_URL,
	ogImage: process.env.NEXT_PUBLIC_APP_URL + "/og.jpg",
	links: {
		github: "https://github.com/vercel/next.js",
	},
};
