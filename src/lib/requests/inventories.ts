import { Inventory } from "@/lib/validations/inventory";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getInventory(id: string) {
	return api.GET<Inventory>(`inventories/${id}`);
}

export async function getInventoryItems(id: string) {
	return api.GET<Inventory>(`inventories/${id}/items`);
}

export async function createInventory(data: Inventory) {
	return api.POST<Inventory>("inventories", data);
}

export async function updateInventory(id: string, data: Inventory) {
	return api.PUT<Inventory>(`inventories/${id}`, data);
}

export async function deleteInventoryById(id: string) {
	return api.DELETE<Inventory>(`inventories/${id}`);
}

export async function getSeveralInventories(queryParams?: {}) {
	return api.GET<Inventory[]>("inventories", queryParams);
}

export async function deleteSeveralInventories(ids: Pick<Inventory, "id">[]) {
	return api.DELETE<Inventory>("inventories");
}
