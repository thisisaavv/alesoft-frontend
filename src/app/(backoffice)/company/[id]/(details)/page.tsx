"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetCompany } from "@/hooks/company/use-get-company";

const publicHeaders = {
	id: "ID",
	name: "Nombre",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function CompanyDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getCompanyQuery = useGetCompany(id);
	const { data, isLoading } = getCompanyQuery;
	const companyData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Detalles de Empresa</h2>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={companyData} />}
		</>
	);
}
