import { Provider } from "@/lib/validations/provider";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getProvider(id: string) {
	return api.GET<Provider>(`providers/${id}`);
}

export async function createProvider(data: Provider) {
	return api.POST<Provider>("providers", data);
}

export async function updateProvider(id: string, data: Provider) {
	return api.PUT<Provider>("providers/" + id, data);
}

export async function deleteProviderById(id: string) {
	return api.DELETE<Provider>(`providers/${id}`);
}

export async function getSeveralProviders(queryParams?: {}) {
	return api.GET<Provider[]>("providers", queryParams);
}

export async function createSeveralProviders(data: Provider[]) {
	return api.POST<Provider[]>("providers", data);
}

export async function updateSeveralProviders(data: Partial<Provider[]>) {
	return api.PUT<Provider[]>("providers", data);
}

export async function deleteSeveralProviders(ids: Pick<Provider, "id">[]) {
	return api.DELETE<Provider>("providers", { ids });
}
