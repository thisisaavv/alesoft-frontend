import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getBackup(id: string) {
	return api.GET<any>(`backups/${id}`);
}

export async function createBackup() {
	return api.POST<any>("backups");
}

export async function updateBackup(id: string, data: any) {
	return api.PUT<any>("backups/" + id, data);
}

export async function deleteBackupById(id: string) {
	return api.DELETE<any>(`backups/${id}`);
}

export async function getSeveralBackups(queryParams?: {}) {
	return api.GET<any[]>("backups", queryParams);
}

export async function createSeveralBackups(data: any[]) {
	return api.POST<any[]>("backups", data);
}

export async function updateSeveralBackups(data: Partial<any[]>) {
	return api.PUT<any[]>("backups", data);
}

export async function deleteSeveralBackups(ids: Pick<any, "id">[]) {
	return api.DELETE<any>("backups", { ids });
}
