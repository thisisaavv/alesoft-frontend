import { ItemCategory } from "@/lib/validations/item-category";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getItemCategory(id: string) {
	return api.GET<ItemCategory>(`categories/${id}`);
}

export async function createItemCategory(data: ItemCategory) {
	return api.POST<ItemCategory>("categories", data);
}

export async function updateItemCategory(id: string, data: ItemCategory) {
	return api.PUT<ItemCategory>("categories/" + id, data);
}

export async function deleteItemCategoryById(id: string) {
	return api.DELETE<ItemCategory>(`categories/${id}`);
}

export async function getSeveralItemCategories(queryParams?: {}) {
	return api.GET<ItemCategory[]>("categories", queryParams);
}

export async function createSeveralItemCategories(data: ItemCategory[]) {
	return api.POST<ItemCategory[]>("categories", data);
}

export async function updateSeveralItemCategories(data: Partial<ItemCategory[]>) {
	return api.PUT<ItemCategory[]>("categories", data);
}

export async function deleteSeveralItemCategories(ids: Pick<ItemCategory, "id">[]) {
	return api.DELETE<ItemCategory>("categories", { ids });
}
