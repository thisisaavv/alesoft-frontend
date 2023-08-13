import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function Logo() {
	return (
		<Link href="/dashboard" className="items-center hidden space-x-2 md:flex">
			<Icons.logo size={25} />
			<span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
		</Link>
	);
}
