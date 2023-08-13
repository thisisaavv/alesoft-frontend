"use client";

import * as React from "react";
import { SidebarOpen } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { dashboardConfig } from "@/config/dashboard";
import { siteConfig } from "@/config/site";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
				>
					<SidebarOpen className="w-6 h-6" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="pr-0">
				<MobileLink href="/" className="flex items-center" onOpenChange={setOpen}>
					<Icons.logo className="w-4 h-4 mr-2" />
					<span className="font-bold">{siteConfig.name}</span>
				</MobileLink>
				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<div className="flex flex-col space-y-3">
						{dashboardConfig.mainNav?.map(
							(item) =>
								item.href && (
									<MobileLink
										key={item.href}
										href={item.href}
										onOpenChange={setOpen}
									>
										{item.title}
									</MobileLink>
								)
						)}
					</div>
					<div className="flex flex-col space-y-2">
						{dashboardConfig.sidebarNav.map((item, index) => (
							<div key={index} className="flex flex-col pt-6 space-y-3">
								<h4 className="font-medium">{item.title}</h4>
								{item?.items?.length &&
									item.items.map((item) => (
										<React.Fragment key={item.href}>
											{!item.disabled &&
												(item.href ? (
													<MobileLink
														href={item.href}
														onOpenChange={setOpen}
													>
														{item.title}
													</MobileLink>
												) : (
													item.title
												))}
										</React.Fragment>
									))}
							</div>
						))}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
	const router = useRouter();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={cn(className)}
			{...props}
		>
			{children}
		</Link>
	);
}
