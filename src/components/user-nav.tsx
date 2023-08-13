"use client";

import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserAuth } from "@/hooks/auth/use-auth-user";

export function UserNav() {
	const router = useRouter();
	const userAuthQuery = useUserAuth();
	const userAuthData = userAuthQuery.data?.data?.data;

	if (userAuthQuery.isLoading) return null;

	const userAuthFirstName = userAuthData?.Employee?.first_name;
	const userAuthLastName = userAuthData?.Employee?.last_name;
	const userAuthFullName = userAuthFirstName + " " + userAuthLastName;
	const userAuthEmail = userAuthData?.email;
	const user = userAuthData?.username;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative w-8 h-8 rounded-full">
					<Avatar className="w-8 h-8">
						{/* <AvatarImage src="/avatars/01.png" alt="@user" /> */}
						<AvatarFallback>
							<span className="text-sm font-medium leading-none text-muted-foreground">
								{userAuthFirstName[0] + userAuthLastName[0]}
							</span>
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{userAuthFullName} (@{user})
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{userAuthEmail}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User className="w-4 h-4 mr-2" />
						<Link href="/profile">Perfil</Link>
						{/* <DropdownMenuShortcut>CTRL+,</DropdownMenuShortcut> */}
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="w-4 h-4 mr-2" />
						<Link href="/settings/profile">Configuración</Link>
						{/* <DropdownMenuShortcut>CTRL+,</DropdownMenuShortcut> */}
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="w-4 h-4 mr-2" />
					<span
						onClick={() => {
							localStorage.removeItem("token");
							window.location.href = "/signin";
						}}
					>
						Cerrar sesión
					</span>
					<DropdownMenuShortcut>CTRL+Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
