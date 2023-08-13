import { Metadata } from "next";

import "@/styles/globals.css";
import { fontSans } from "./fonts";
import { Analytics } from "@/components/analitycs";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { Router } from "@/components/router";
import Providers from "@/components/providers";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: ["ERP", "CRM", "Inventory", "Sales", "Products", "Customers", "Orders"],
	authors: [
		{
			name: "thisisaavv",
			url: "https://thisisaavv.com",
		},
	],
	creator: "thisisaavv",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	// openGraph: {
	// 	type: "website",
	// 	locale: "es_MX",
	// 	url: siteConfig.url,
	// 	title: siteConfig.name,
	// 	description: siteConfig.description,
	// 	siteName: siteConfig.name,
	// },
	// manifest: `${siteConfig.url}/site.webmanifest`,
	icons: {
		icon: "/favicon.ico",
		// shortcut: "/favicon-16x16.png",
		// apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={fontSans.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Router>
						<Providers>{children}</Providers>
					</Router>
					{/* <Analytics /> */}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}

// https://codevoweb.com/setup-react-query-in-nextjs-13-app-directory/
