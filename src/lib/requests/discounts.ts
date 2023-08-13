import { Discount } from "@/lib/validations/discount";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getDiscount(id: string) {
	return api.GET<Discount>(`discounts/${id}`);
}

export async function createDiscount(data: Discount) {
	return api.POST<Discount>("discounts", data);
}

export async function updateDiscount(id: string, data: Discount) {
	return api.PUT<Discount>("discounts/" + id, data);
}

export async function deleteDiscountById(id: string) {
	return api.DELETE<Discount>(`discounts/${id}`);
}

export async function getSeveralDiscounts(queryParams?: {}) {
	return api.GET<Discount[]>("discounts", queryParams);
}

export async function createSeveralDiscounts(data: Discount[]) {
	return api.POST<Discount[]>("discounts", data);
}

export async function updateSeveralDiscounts(data: Partial<Discount[]>) {
	return api.PUT<Discount[]>("discounts", data);
}

export async function deleteSeveralDiscounts(ids: Pick<Discount, "id">[]) {
	return api.DELETE<Discount>("discounts", { ids });
}
