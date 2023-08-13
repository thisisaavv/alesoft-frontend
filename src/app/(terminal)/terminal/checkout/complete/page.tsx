"use client";

import { useRouter } from "next/navigation";

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
						<h2 className="text-2xl font-bold tracking-tight">Recibo</h2>
					</div>
					<div>
						<Button
							size="sm"
							variant="ghost"
							onClick={() =>
								router.back ? router.back() : router.push("/dashboard")
							}
						>
							<Icons.printer />
						</Button>
						<Button
							size="sm"
							variant="ghost"
							onClick={() =>
								router.back ? router.back() : router.push("/dashboard")
							}
						>
							<Icons.share />
						</Button>
						<Button
							size="sm"
							variant="ghost"
							onClick={() =>
								router.back ? router.back() : router.push("/dashboard")
							}
						>
							<Icons.download />
						</Button>
					</div>
				</div>
			</header>
			<div className="flex items-center justify-center mt-4">
				<div className="p-4 w-[300px] h-[400px] border-[1px] border-[#e2e8f0] rounded-[10px]">
					<div className="flex items-center justify-between">
						<div className="text-sm text-gray-500">Fecha</div>
						<div className="text-sm font-medium">{new Date().toLocaleDateString()}</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm text-gray-500">Hora</div>

						<div className="text-sm font-medium">{new Date().toLocaleTimeString()}</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm text-gray-500">Terminal</div>

						<div className="text-sm font-medium">1</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="text-sm text-gray-500">Cajero</div>

						{/* <div className="text-sm font-medium">{localStorage.getItem("name")}</div> */}
						<div className="text-sm font-medium">John Doe</div>
					</div>
				</div>
			</div>
		</>
	);
}
