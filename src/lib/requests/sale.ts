import { Sale } from "@/lib/validations/sale";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getSale(id: string) {
	return api.GET<Sale>(`sales/${id}`);
}

export async function createSale(data: Sale) {
	return api.POST<Sale>("sales", data);
}

export async function updateSale(id: string, data: Sale) {
	return api.PUT<Sale>(`sales/${id}`, data);
}

export async function deleteSaleById(id: string) {
	return api.DELETE<Sale>(`sales/${id}`);
}

export async function getSeveralSales(params?: {}) {
	return api.GET<Sale[]>("sales", params);
}

export async function deleteSeveralSales(ids: string[]) {
	return api.DELETE<Sale>("sales", ids.join(","));
}
