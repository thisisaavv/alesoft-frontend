import { ItemVariant } from "@/lib/validations/item-variant";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getItemVariant(id: string) {
	return api.GET<ItemVariant>(`variants/${id}`);
}

export async function createItemVariant(data: ItemVariant) {
	return api.POST<ItemVariant>("variants", data);
}

export async function updateItemVariant(id: string, data: ItemVariant) {
	return api.PUT<ItemVariant>("variants/" + id, data);
}

export async function deleteItemVariantById(id: string) {
	return api.DELETE<ItemVariant>(`variants/${id}`);
}

export async function getSeveralItemVariants(queryParams?: {}) {
	return api.GET<ItemVariant[]>("variants", queryParams);
}

export async function createSeveralItemVariants(data: ItemVariant[]) {
	return api.POST<ItemVariant[]>("variants", data);
}

export async function updateSeveralItemVariants(data: Partial<ItemVariant[]>) {
	return api.PUT<ItemVariant[]>("variants", data);
}

export async function deleteSeveralItemVariants(ids: Pick<ItemVariant, "id">[]) {
	return api.DELETE<ItemVariant>("variants", { ids });
}
