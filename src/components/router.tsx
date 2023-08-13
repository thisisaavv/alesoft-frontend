"use client";

import * as React from "react";

export function Router({ children }: { children: React.ReactNode }) {
	// const currentPath = window && window.location.pathname;
	const currentPath = "/current/2";
	const currentBasePath = currentPath.split("/")[1];

	return <>{children}</>;
}
