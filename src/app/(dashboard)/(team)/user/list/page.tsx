"use client";

import { useRouter } from "next/navigation";
import { Metadata } from "next";

import { UserTable } from "@/components/tables/user-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// export const metadata: Metadata = {
// 	title: "Usuarios",
// 	description: "Users",
// };

export default function UsersListPage() {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Lista de Usuarios</h2>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
						onClick={() => {
							router.push("/user/create");
						}}
					>
						<Plus className="mr-2 h-4 w-4" />
						Crear Usuario
					</Button>
				</div>
			</div>
			<UserTable />
		</>
	);
}
