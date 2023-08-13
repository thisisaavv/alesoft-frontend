import { SubmitHandler } from "react-hook-form";
import { User } from "@/lib/validations/user";
import { Icons } from "@/components/icons";

export type NavItem = {
	title: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
	label?: string;
	permission?: string;
} & (
	| {
			href: string;
			items?: never;
	  }
	| {
			href?: string;
			items: NavItem[];
	  }
);

export type MainNavItem = NavItem;

export type SidebarNavItem = NavItem;

export type SiteConfig = {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	links: {
		github: string;
	};
};

export type MarketingConfig = {
	mainNav: MainNavItem[];
};

export type BackofficeConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
};

export type DashboardConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
};

export type DocsConfig = {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
};

interface FormProps<T> {
	onSubmit?: SubmitHandler<User>;
	data?: T;
}

interface TableProps {
	data: Array<any>;
	columns: Array<any>;
}

export interface Columns<T> {
	key: keyof T;
	title: string;
}

interface IRoute {
	path: string;
	isPublic?: boolean;
	isAllowed?: boolean;
	redirectTo?: string;
}
