import { Purchase } from "@/lib/validations/purchase";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getPurchase(id: string) {
	return api.GET<Purchase>(`purchases/${id}`);
}

export async function createPurchase(data: Purchase) {
	return api.POST<Purchase>("purchases", data);
}

export async function updatePurchase(id: string, data: Purchase) {
	return api.PUT<Purchase>("purchases/" + id, data);
}

export async function deletePurchaseById(id: string) {
	return api.DELETE<Purchase>(`purchases/${id}`);
}

export async function getSeveralPurchases(queryParams?: {}) {
	return api.GET<Purchase[]>("purchases", queryParams);
}

export async function createSeveralPurchases(data: Purchase[]) {
	return api.POST<Purchase[]>("purchases", data);
}

export async function updateSeveralPurchases(data: Partial<Purchase[]>) {
	return api.PUT<Purchase[]>("purchases", data);
}

export async function deleteSeveralPurchases(ids: Pick<Purchase, "id">[]) {
	return api.DELETE<Purchase>("purchases", { ids });
}
