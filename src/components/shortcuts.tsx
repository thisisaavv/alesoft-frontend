"use client";

import { useKeyboardShortcut } from "@/hooks/use-shortcut";
import { useRouter } from "next/navigation";
import { CommandMenu } from "@/components/command-menu";

function Shortcuts() {
	const router = useRouter();

	const handleCloseSession = () => {
		console.log("Close session");
	};

	const handleOpenSearch = () => {
		console.log("Open search");
	};

	const handleOpenShortcutModal = () => {
		console.log("Open shortcut modal");
	};

	const handleOpenSettings = () => {
		console.log("Open settings");
	};

	useKeyboardShortcut(["?"], handleOpenShortcutModal);
	useKeyboardShortcut(["ctrl", "."], handleOpenSettings);
	useKeyboardShortcut(["ctrl", "q"], handleCloseSession);

	useKeyboardShortcut(["shift", "t"], () => {
		router.push("/transaction/list");
	});

	return <></>;
}

export { Shortcuts };
