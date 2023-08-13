"use client";

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen overflow-hidden">
			<main className="hidden h-full flex-1 flex-col md:flex">{children}</main>
		</div>
	);
}
