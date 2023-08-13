import { Metadata } from "next";

import { VirtualRetailTerminalForm } from "@/components/forms/virtual-retail-terminal-form";

export const metadata: Metadata = {
	title: "Terminal Virtual",
	description: "Terminal Virtual",
};

export default function VirtualTerminalPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Terminal Virtual</h2>
				</div>
			</div>
			<VirtualRetailTerminalForm />
		</>
	);
}
