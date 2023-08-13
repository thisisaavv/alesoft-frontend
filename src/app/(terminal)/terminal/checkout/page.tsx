"use client";

import { useRouter } from "next/navigation";

import { VirtualRestaurantTerminalForm } from "@/components/forms/virtual-restaurant-terminal-form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function VirtualTerminalPage() {
	const router = useRouter();

	return (
		<>
			<header className="bg-background border-b">
				<div className="flex items-center justify-between p-4">
					<Button
						size="sm"
						variant="ghost"
						onClick={() => (router.back ? router.back() : router.push("/dashboard"))}
					>
						<Icons.close />
					</Button>
					<div className="content-center">
						<h2 className="text-2xl font-bold tracking-tight">Terminal Virtual</h2>
					</div>
					<div></div>
				</div>
			</header>
			<VirtualRestaurantTerminalForm />
		</>
	);
}
