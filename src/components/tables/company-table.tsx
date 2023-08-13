"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { Action } from "@/components/data-table-row-actions";
import { Company } from "@/lib/validations/company";
import { useDeleteCompany } from "@/hooks/company/use-delete-company";
import { useGetSeveralCompanies } from "@/hooks/company/use-get-several-companies";

const columnsDef: Columns<Company>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "bussiness_id",
		title: "RTN",
	},
	{
		key: "phone" as any,
		title: "Teléfono",
	},
	// {
	// 	key: "address" as any,
	// 	title: "Dirección",
	// },
];

const actions = ({ deleteCompany }: any): Action<Company> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar esta empresa?")) return;
			deleteCompany({ id: row.original.id });
		},
	},
});

export function CompanyTable() {
	const severalCompaniesQuery = useGetSeveralCompanies();
	const deleteCompanyQuery = useDeleteCompany();

	const companiesList = severalCompaniesQuery.data?.data?.data || [];
	const companiesListFiltered = companiesList?.map((company: any) => ({
		...company,
		// address: company?.Contact.Address?.street,
		phone: company?.Contact?.phone,
	}));
	const rowActions = actions({ deleteCompany: deleteCompanyQuery.mutate });
	const companyColumns = serialiseColumns<Company>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ name: "Nombre" }}
			columns={companyColumns}
			data={companiesListFiltered}
		/>
	);
}
