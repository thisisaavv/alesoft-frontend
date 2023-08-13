import { Header } from "@/components/site-header";
import { SidebarNav } from "@/components/sidebar-nav";
import { Footer } from "@/components/site-footer";
import { Separator } from "@/components/ui/separator";
import { settingsConfig } from "@/config/settings";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen space-y-6">
			<Header />
			<div className="container space-y-0.5">
				<h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
				<p className="text-muted-foreground">
					Controla la configuración de tu cuenta y establece las preferencias de correo
					electrónico.
				</p>
			</div>
			<Separator className="my-6" />
			<div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
				<aside className="hidden w-[200px] flex-col md:flex">
					<SidebarNav items={settingsConfig.sidebarNav} />
				</aside>
				<main className="flex flex-col flex-1 w-full overflow-hidden">
					<div className="hidden h-full flex-1 flex-col space-y-8 py-4 px-8 md:flex">
						{children}
					</div>
				</main>
			</div>
			<Footer className="border-t" />
		</div>
	);
}
