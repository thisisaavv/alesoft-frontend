import { Invoice } from "@/lib/validations/invoice";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getInvoiceLote(id: string) {
	return api.GET<Invoice>(`invoice-lotes/${id}`);
}

export async function createInvoiceLote(data: Invoice) {
	return api.POST<Invoice>("invoice-lotes", data);
}

export async function updateInvoiceLote(id: string, data: Invoice) {
	return api.PUT<Invoice>("invoice-lotes/" + id, data);
}

export async function deleteInvoiceLoteById(id: string) {
	return api.DELETE<Invoice>(`invoice-lotes/${id}`);
}

export async function getSeveralInvoiceLotes(queryParams?: {}) {
	return api.GET<Invoice[]>("invoice-lotes", queryParams);
}

export async function createSeveralInvoiceLotes(data: Invoice[]) {
	return api.POST<Invoice[]>("invoice-lotes", data);
}

export async function updateSeveralInvoiceLotes(data: Partial<Invoice[]>) {
	return api.PUT<Invoice[]>("invoice-lotes", data);
}

export async function deleteSeveralInvoiceLotes(ids: Pick<Invoice, "id">[]) {
	return api.DELETE<Invoice>("invoice-lotes", { ids });
}
