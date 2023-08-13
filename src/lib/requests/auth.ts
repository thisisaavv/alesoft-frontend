import { API } from "@/lib/axios";
import { User } from "@/lib/validations/user";

const api = API.getInstance();

export async function signIn(data: { identifier: string; password: string }) {
	return await api.POST("auth/sign-in", data);
}

export async function signUp(data: { email: string; password: string; name: string }) {
	return await api.POST("auth/signup", data);
}

export async function getUserAuth() {
	return await api.GET("auth/session");
}

export async function signOut() {
	return await api.POST("auth/signout");
}

export async function changePassword(data: { password: string }) {
	return await api.POST("auth/me/change-password", data);
}

export async function changeEmail(data: { new_email: string }) {
	return await api.POST("auth/me/change-email", data);
}

export async function recoverAccount(data: { email: string }) {
	return await api.POST("auth/recover-account", data);
}

export async function resetPassword(data: { new_password: string; token: string }) {
	return await api.POST("auth/reset-password", data);
}

export async function desactivateAccount() {
	return await api.POST("auth/me/desactivate");
}

export async function verifyEmail(data: { token: string }) {
	if (!data.token) throw new Error("Token is required");

	return await api.POST("auth/verify-email", data);
}
