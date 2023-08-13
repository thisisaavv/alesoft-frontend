import { Menu } from "@/lib/validations/menu";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getMenu(id: string) {
	return api.GET<Menu>(`menus/${id}`);
}

export async function createMenu(data: Menu) {
	return api.POST<Menu>("menus", data);
}

export async function updateMenu(id: string, data: Menu) {
	return api.PUT<Menu>("menus/" + id, data);
}

export async function deleteMenuById(id: string) {
	return api.DELETE<Menu>(`menus/${id}`);
}

export async function getSeveralMenus(queryParams?: {}) {
	return api.GET<Menu[]>("menus", queryParams);
}

export async function createSeveralMenus(data: Menu[]) {
	return api.POST<Menu[]>("menus", data);
}

export async function updateSeveralMenus(data: Partial<Menu[]>) {
	return api.PUT<Menu[]>("menus", data);
}

export async function deleteSeveralMenus(ids: string[]) {
	return api.DELETE<Menu>("menus", { ids });
}
