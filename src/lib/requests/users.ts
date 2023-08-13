import { User } from "@/lib/validations/user";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getUser(id: string) {
	return api.GET<User>(`users/${id}`);
}

export async function createUser(data: User) {
	return api.POST<User>("users", data);
}

export async function updateUser(id: string, data: User) {
	return api.PUT<User>(`users/${id}`, data);
}

export async function deleteUserById(id: string) {
	return api.DELETE<User>(`users/${id}`);
}

export async function getSeveralUsers(params?: {}) {
	return api.GET<User[]>("users", params);
}

export async function deleteSeveralUsers(ids: string[]) {
	return api.DELETE<User>("users", { ids: ids.join(",") });
}
