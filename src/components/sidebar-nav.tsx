"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "../types";
import { useUserAuth } from "@/hooks/auth/use-auth-user";

interface SidebarNavProps {
	items: SidebarNavItem[];
}

function Label({ children }: { children: string }) {
	return (
		<span className="text-xs font-semibold text-accent-foreground uppercase">{children}</span>
	);
}

export function SidebarNav({ items }: SidebarNavProps) {
	const path = usePathname();
	const userAuthQuery = useUserAuth();
	const user = userAuthQuery.data?.data?.data;
	if (!items?.length) return null;

	return (
		<nav className="grid items-start gap-2">
			{items.map((item, index) => {
				const Icon = Icons[item.icon || "arrowRight"];
				const permission = item?.permission;
				if (permission && !user?.UserRole?.[permission as any]) return null;

				return (
					<div key={index}>
						{item.href ? (
							<>
								<Link key={index} href={item.disabled ? "#" : item.href}>
									<span
										className={cn(
											"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
											path === item.href ? "bg-accent" : "transparent",
											item.disabled && "cursor-not-allowed opacity-80"
										)}
									>
										<Icon className="w-4 h-4 mr-2" />
										<span>{item.title}</span>
									</span>
								</Link>
								{item?.items && (
									<div className="mt-2 ml-4 grid gap-2 border-l border-accent-foreground border-opacity-10">
										{item?.items.map((child, index) => {
											const permission = child?.permission;
											if (permission && !user?.UserRole?.[permission as any])
												return null;

											return (
												<Link
													key={index}
													href={child.disabled ? "#" : child.href!}
												>
													<span
														className={cn(
															"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
															path === child.href
																? "bg-accent"
																: "transparent",
															child.disabled &&
																"cursor-not-allowed opacity-80"
														)}
													>
														<Icons.arrowRight className="w-4 h-4 mr-2" />
														<span>{child.title}</span>
													</span>
												</Link>
											);
										})}
									</div>
								)}
							</>
						) : (
							<span
								key={index}
								className={cn(
									"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
									path === item.href ? "bg-accent" : "transparent",
									item.disabled && "cursor-not-allowed opacity-80"
								)}
							>
								<Icon className="w-4 h-4 mr-2" />
								<span>{item.title}</span>
							</span>
						)}
					</div>
				);
			})}
		</nav>
	);
}
