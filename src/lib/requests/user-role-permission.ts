import { User } from "@/lib/validations/user";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getUserRolePermission(id: string) {
	return api.GET<User>(`roles/${id}`);
}

export async function createUserRolePermission(data: User) {
	return api.POST<User>("roles", data);
}

export async function updateUserRolePermission(id: string, data: User) {
	return api.PUT<User>(`roles/${id}`, data);
}

export async function deleteUserRolePermissionById(id: string) {
	return api.DELETE<User>(`roles/${id}`);
}

export async function getSeveralUserRolePermissions(queryParams?: {}) {
	return api.GET<User[]>("roles", queryParams);
}

export async function deleteSeveralUserRolePermissions(ids: string[]) {
	return api.DELETE<User>("roles", ids.join(","));
}
