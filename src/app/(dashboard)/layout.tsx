import { Header } from "@/components/site-header";
import { SidebarNav } from "@/components/sidebar-nav";
import { Footer } from "@/components/site-footer";
import { dashboardConfig } from "@/config/dashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen space-y-6">
			<Header />
			<div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
				<aside className="hidden w-[200px] flex-col md:flex">
					<SidebarNav items={dashboardConfig.sidebarNav} />
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
