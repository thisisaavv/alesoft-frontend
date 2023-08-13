import { Customer } from "@/lib/validations/customer";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getCustomer(id: string) {
	return api.GET<Customer>(`customers/${id}`);
}

export async function createCustomer(data: Customer) {
	return api.POST<Customer>("customers", data);
}

export async function updateCustomer(id: string, data: Customer) {
	return api.PUT<Customer>("customers/" + id, data);
}

export async function deleteCustomerById(id: string) {
	return api.DELETE<Customer>(`customers/${id}`);
}

export async function getSeveralCustomers(queryParams?: {}) {
	return api.GET<Customer[]>("customers", queryParams);
}

export async function createSeveralCustomers(data: Customer[]) {
	return api.POST<Customer[]>("customers", data);
}

export async function updateSeveralCustomers(data: Partial<Customer[]>) {
	return api.PUT<Customer[]>("customers", data);
}

export async function deleteSeveralCustomers(ids: Pick<Customer, "id">[]) {
	return api.DELETE<Customer>("customers", { ids });
}
