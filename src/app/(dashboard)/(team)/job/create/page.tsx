import { Metadata } from "next";
import { JobForm } from "@/components/forms/job-form";

export const metadata: Metadata = {
	title: "Crear Empleo",
	description: "Crear Empleo",
};

export default function JobRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Empleo</h2>
				</div>
			</div>
			<JobForm />
		</>
	);
}
