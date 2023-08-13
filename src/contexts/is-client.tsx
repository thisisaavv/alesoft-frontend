import * as React from "react";

const IsClientCtx = React.createContext(false);

export const IsClientCtxProvider = ({ children }: any) => {
	const [isClient, setIsClient] = React.useState(false);
	React.useEffect(() => setIsClient(true), []);
	return <IsClientCtx.Provider value={isClient}>{children}</IsClientCtx.Provider>;
};

export function useIsClient() {
	return React.useContext(IsClientCtx);
}

// https://stackoverflow.com/questions/75692116/next-js-13-window-is-not-defined
