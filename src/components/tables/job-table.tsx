"use client";

import * as React from "react";

import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { Columns } from "../../types";
import { Job } from "@/lib/validations/job";
import { useGetSeveralJobs } from "@/hooks/job/use-get-several-jobs";
import { useDeleteJob } from "@/hooks/job/use-delete-job";
import { Action } from "@/components/data-table-row-actions";

const columnsDef: Columns<Job>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "description",
		title: "Descripción",
	},
];

const actions = ({ deleteJob }: any): Action<Job> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Está seguro de que desea eliminar este trabajo?")) return;
			deleteJob({ id: row.original.id });
		},
	},
});

export function JobTable() {
	const severalJobsQuery = useGetSeveralJobs();
	const deleteJobQuery = useDeleteJob();

	const jobsList = severalJobsQuery.data?.data?.data || [];
	const jobsListFiltered = jobsList?.map((job: any) => ({
		...job,
	}));
	const rowActions = actions({ deleteJob: deleteJobQuery.mutate });
	const jobColumns = serialiseColumns<Job>(columnsDef, rowActions);

	return <DataTable filterBy={{ name: "Nombre" }} columns={jobColumns} data={jobsListFiltered} />;
}
