import { ItemModifier } from "@/lib/validations/item-modifier";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getItemModifier(id: string) {
	return api.GET<ItemModifier>(`modifiers/${id}`);
}

export async function createItemModifier(data: ItemModifier) {
	return api.POST<ItemModifier>("modifiers", data);
}

export async function updateItemModifier(id: string, data: ItemModifier) {
	return api.PUT<ItemModifier>("modifiers/" + id, data);
}

export async function deleteItemModifierById(id: string) {
	return api.DELETE<ItemModifier>(`modifiers/${id}`);
}

export async function getSeveralItemModifiers(queryParams?: {}) {
	return api.GET<ItemModifier[]>("modifiers", queryParams);
}

export async function createSeveralItemModifiers(data: ItemModifier[]) {
	return api.POST<ItemModifier[]>("modifiers", data);
}

export async function updateSeveralItemModifiers(data: Partial<ItemModifier[]>) {
	return api.PUT<ItemModifier[]>("modifiers", data);
}

export async function deleteSeveralItemModifiers(ids: Pick<ItemModifier, "id">[]) {
	return api.DELETE<ItemModifier>("modifiers", { ids });
}
