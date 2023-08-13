"use client";

import { useGetCompany } from "@/hooks/company/use-get-company";
import { CompanyForm } from "@/components/forms/company-form";
import { useUserAuth } from "@/hooks/auth/use-auth-user";

export default function CompanyEditPage() {
	const userAuth = useUserAuth();
	const companyId = userAuth.data?.data?.data?.Employee?.company_id;
	const getMyCompanyQuery = useGetCompany(companyId);
	const { data, isLoading, isError, error, refetch } = getMyCompanyQuery;

	if (isLoading || userAuth.isLoading) return <div>Cargando...</div>;
	else refetch();
	if (isError) return <div>Error: {<>{error}</>}</div>;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Mi Empresa</h2>
			</div>
			<CompanyForm data={data.data} />
		</>
	);
}
