"use client";

import { useParams } from "next/navigation";

import { useGetJob } from "@/hooks/job/use-get-job";
import { JobForm } from "@/components/forms/job-form";

export default function JobEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getJobQuery = useGetJob(id);
	const { data, isLoading, isError, error } = getJobQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Modificar Empleo</h2>
				</div>
				{/* <div className="flex items-center space-x-2">Acciones</div> */}
			</div>
			<JobForm data={data.data} />
		</>
	);
}
