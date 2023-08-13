import Link from "next/link";
import { Logo } from "@/components/logo";

function Footer() {
	return (
		<footer className="border-t footer">
			<div className="container flex flex-col items-center justify-between py-8 space-y-4 md:flex-row md:space-y-0">
				<div className="flex items-center space-x-4">
					<Logo />
					{/* <div className="text-sm text-muted-foreground">
						&copy; 2021, All rights reserved.
					</div> */}
				</div>
				<div className="flex items-center space-x-4">
					{/* <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
						Terms
					</Link>
					<Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
						Privacy
					</Link>
					<Link href="/contact" className="text-sm text-muted-foreground hover:underline">
						Contact
					</Link> */}
					<span className="text-sm text-muted-foreground">Built with ❤️ by Team 4</span>
				</div>
			</div>
		</footer>
	);
}
export { Footer };
