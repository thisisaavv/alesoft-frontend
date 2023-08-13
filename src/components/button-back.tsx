import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function ButtonBack({
	title,
	href,
	position = "absolute",
	size = "lg",
}: {
	title?: string;
	href?: string;
	position?: "relative" | "absolute";
	size?: "sm" | "md" | "lg";
}) {
	return (
		<Link
			href="/"
			className={cn(
				buttonVariants({ variant: "ghost" }),
				position === "absolute" ? "absolute left-4 top-4 md:left-8 md:top-8" : "relative"
				// size === "sm" ? "text-sm" : size === "md" ? "text-md" : "text-lg"
			)}
		>
			<Icons.chevronLeft className="mr-2 h-4 w-4" />
			{title}
		</Link>
	);
}
