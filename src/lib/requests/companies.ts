import { Company } from "@/lib/validations/company";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getCompany(id: string) {
	return api.GET<Company>(`companies/${id}`);
}

export async function createCompany(data: Company) {
	return api.POST<Company>("companies", data);
}

export async function updateCompany(id: string, data: Company) {
	return api.PUT<Company>("companies/" + id, data);
}

export async function deleteCompanyById(id: string) {
	return api.DELETE<Company>(`companies/${id}`);
}

export async function getSeveralCompanies(queryParams?: {}) {
	return api.GET<Company[]>("companies", queryParams);
}

export async function createSeveralCompanies(data: Company[]) {
	return api.POST<Company[]>("companies", data);
}

export async function updateSeveralCompanies(data: Partial<Company[]>) {
	return api.PUT<Company[]>("companies", data);
}

export async function deleteSeveralCompanies(ids: Pick<Company, "id">[]) {
	return api.DELETE<Company>("companies", { ids });
}
