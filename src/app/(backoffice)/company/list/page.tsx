"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CompanyTable } from "@/components/tables/company-table";
import { useUserAuth } from "@/hooks/auth/use-auth-user";

export default function CompaniesListPage() {
	const router = useRouter();
	const userAuth = useUserAuth();

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Lista de Empresas</h2>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						className="ml-auto hidden h-8 lg:flex"
						onClick={() => {
							router.push("/company/create");
						}}
					>
						<Plus className="mr-2 h-4 w-4" />
						Crear Empresa
					</Button>
				</div>
			</div>
			<CompanyTable />
		</>
	);
}
