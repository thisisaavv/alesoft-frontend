import { Tax } from "@/lib/validations/tax";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getTax(id: string) {
	return api.GET<Tax>(`taxes/${id}`);
}

export async function createTax(data: Tax) {
	return api.POST<Tax>("taxes", data);
}

export async function updateTax(id: string, data: Tax) {
	return api.PUT<Tax>("taxes/" + id, data);
}

export async function deleteTaxById(id: string) {
	return api.DELETE<Tax>(`taxes/${id}`);
}

export async function getSeveralTaxes(queryParams?: {}) {
	return api.GET<Tax[]>("taxes", queryParams);
}

export async function createSeveralTaxes(data: Tax[]) {
	return api.POST<Tax[]>("taxes", data);
}

export async function updateSeveralTaxes(data: Partial<Tax[]>) {
	return api.PUT<Tax[]>("taxes", data);
}

export async function deleteSeveralTaxes(ids: Pick<Tax, "id">[]) {
	return api.DELETE<Tax>("taxes", { ids });
}
