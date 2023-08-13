"use client";

import { dashboardConfig } from "@/config/dashboard";
import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { UserNav } from "@/components/user-nav";

export function Header() {
	return (
		<header className="sticky top-0 z-40 border-b bg-background">
			<div className="container flex items-center justify-between h-16 py-4">
				<MainNav items={dashboardConfig.mainNav} />
				{/* <MobileNav /> */}
				<div className="flex items-center justify-between flex-1 space-x-2 sm:space-x-4 md:justify-end">
					<div className="flex-1 w-full md:w-auto md:flex-none">
						<CommandMenu />
					</div>
					<UserNav />
				</div>
			</div>
		</header>
	);
}
