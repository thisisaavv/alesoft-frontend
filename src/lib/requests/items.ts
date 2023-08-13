import { Item } from "@/lib/validations/item";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getItem(id: string) {
	return api.GET<Item>(`items/${id}`);
}

export async function createItem(data: Item) {
	return api.POST<Item>("items", data);
}

export async function updateItem(id: string, data: Item) {
	return api.PUT<Item>(`items/${id}`, data);
}

export async function deleteItemById(id: string) {
	return api.DELETE<Item>(`items/${id}`);
}

export async function getSeveralItems(params?: {}) {
	return api.GET<Item[]>("items");
}

export async function deleteSeveralItems(ids: Pick<Item, "id">[]) {
	return api.DELETE<Item>("items");
}
