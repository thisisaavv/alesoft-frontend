import { Job } from "@/lib/validations/job";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getJob(id: string) {
	return api.GET<Job>(`jobs/${id}`);
}

export async function createJob(data: Job) {
	return api.POST<Job>("jobs", data);
}

export async function updateJob(id: string, data: Job) {
	return api.PUT<Job>("jobs/" + id, data);
}

export async function deleteJobById(id: string) {
	return api.DELETE<Job>(`jobs/${id}`);
}

export async function getSeveralJobs(queryParams?: {}) {
	return api.GET<Job[]>("jobs", queryParams);
}

export async function createSeveralJobs(data: Job[]) {
	return api.POST<Job[]>("jobs", data);
}

export async function updateSeveralJobs(data: Partial<Job[]>) {
	return api.PUT<Job[]>("jobs", data);
}

export async function deleteSeveralJobs(ids: string[]) {
	return api.DELETE<Job>("jobs", { ids });
}
