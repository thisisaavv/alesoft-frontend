"use client";

import { useRouter } from "next/navigation";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserRoleTable } from "@/components/tables/user-role-table";

// export const metadata: Metadata = {
// 	title: "Lista de Roles de Usuario",
// 	description: "Lista de Roles de Usuario",
// };

export default function UserRoleListPage() {
	const router = useRouter();

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Lista de Permisos</h2>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
						onClick={() => {
							router.push("/permission/create");
						}}
					>
						<Plus className="mr-2 h-4 w-4" />
						Crear Rol
					</Button>
				</div>
			</div>
			<UserRoleTable />
		</>
	);
}
