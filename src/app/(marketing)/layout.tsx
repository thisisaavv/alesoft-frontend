import Link from "next/link";

import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { marketingConfig } from "@/config/marketing";

interface MarketingLayoutProps {
	children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="container z-40 bg-background">
				<div className="flex items-center justify-between h-20 py-6">
					<MainNav items={marketingConfig.mainNav} />
					<nav>
						<Link
							href="/signin"
							className={cn(
								buttonVariants({ variant: "secondary", size: "sm" }),
								"px-4"
							)}
						>
							Iniciar sesión
						</Link>
					</nav>
				</div>
			</header>
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
