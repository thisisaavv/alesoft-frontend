"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@/components/details-view";
import { useGetJob } from "@/hooks/job/use-get-job";

const publicHeaders = {
	id: "ID",
	name: "Nombre",
	description: "Descripción",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function JobDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getJobQuery = useGetJob(id);
	const { data, isLoading } = getJobQuery;
	const jobData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Empleo</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={jobData} />}
		</>
	);
}
