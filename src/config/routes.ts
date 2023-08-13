import { IRoute } from "@/types";

const routes: IRoute[] = [
	{
		path: "/",
		isPublic: true,
	},
	{
		path: "/signin",
		isPublic: true,
	},
	{
		path: "/signup",
		isPublic: true,
	},
	{
		path: "/dashboard",
	},
	{
		path: "/dashboard/pos",
	},
	{
		path: "/dashboard/pos/overview",
	},
];
