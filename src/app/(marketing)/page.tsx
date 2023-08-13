import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default async function IndexPage() {
	return (
		<>
			<section className="pt-6 pb-8 space-y-6 md:pb-12 md:pt-10 lg:py-32">
				<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
					<h1 className="text-3xl font-heading sm:text-5xl md:text-6xl lg:text-7xl">
						{siteConfig.name} un ERP para el siglo XXI
					</h1>
					<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						Moderno, simple y fácil de usar.
					</p>
					<div className="space-x-4">
						<Link href="/signin" className={cn(buttonVariants({ size: "lg" }))}>
							Comenzar ahora
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}

// https://github.com/jherr/nextjs13-state-zustand/tree/main
// https://github.com/imbhargav5/nextbase-nextjs13-supabase-starter
// https://dev.to/alexeagleson/how-to-build-scalable-architecture-for-your-nextjs-project-2pb7
// https://github.com/joschan21/nextjs-realtime-chat
// https://github.com/jherr/nextjs13-pokemon
