import { UserRole } from "@/lib/validations/user-roles";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getUserRole(id: string) {
	return api.GET<UserRole>(`user-roles/${id}`);
}

export async function createUserRole(data: UserRole) {
	return api.POST<UserRole>("user-roles", data);
}

export async function updateUserRole(id: string, data: UserRole) {
	return api.PUT<UserRole>(`user-roles/${id}`, data);
}

export async function deleteUserRoleById(id: string) {
	return api.DELETE<UserRole>(`user-roles/${id}`);
}

export async function getSeveralUserRoles(params?: {}) {
	return api.GET<UserRole[]>("user-roles", params);
}

export async function deleteSeveralUserRoles(ids: string[]) {
	return api.DELETE<UserRole>("user-roles", ids.join(","));
}
