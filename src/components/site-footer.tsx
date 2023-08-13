import * as React from "react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
	return (
		<footer className={cn(className)}>
			<div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<Logo />
					<p className="text-sm leading-loose text-center md:text-left">
						Hecho con ❤️ por Equipo 5
					</p>
				</div>
				<ModeToggle />
			</div>
		</footer>
	);
}
