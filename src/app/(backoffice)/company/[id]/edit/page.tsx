"use client";

import { useParams } from "next/navigation";

import { useGetCompany } from "@/hooks/company/use-get-company";
import { CompanyForm } from "@/components/forms/company-form";

export default function CompanyEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getCompanyQuery = useGetCompany(id);
	const { data, isLoading, isError, error } = getCompanyQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Modificar Empresa</h2>
			</div>
			<CompanyForm data={data.data} />
		</>
	);
}
