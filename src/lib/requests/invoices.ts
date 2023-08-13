import { Invoice } from "@/lib/validations/invoice";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getInvoice(id: string) {
	return api.GET<Invoice>(`invoices/${id}`);
}

export async function createInvoice(data: Invoice) {
	return api.POST<Invoice>("invoices", data);
}

export async function updateInvoice(id: string, data: Invoice) {
	return api.PUT<Invoice>("invoices/" + id, data);
}

export async function deleteInvoiceById(id: string) {
	return api.DELETE<Invoice>(`invoices/${id}`);
}

export async function getSeveralInvoices(queryParams?: {}) {
	return api.GET<Invoice[]>("invoices", queryParams);
}

export async function createSeveralInvoices(data: Invoice[]) {
	return api.POST<Invoice[]>("invoices", data);
}

export async function updateSeveralInvoices(data: Partial<Invoice[]>) {
	return api.PUT<Invoice[]>("invoices", data);
}

export async function deleteSeveralInvoices(ids: Pick<Invoice, "id">[]) {
	return api.DELETE<Invoice>("invoices", { ids });
}
