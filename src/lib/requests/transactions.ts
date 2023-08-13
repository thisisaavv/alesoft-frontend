import { Transaction } from "@/lib/validations/transaction";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getTransaction(id: string) {
	return api.GET<Transaction>(`transactions/${id}`);
}

export async function createTransaction(data: Transaction) {
	return api.POST<Transaction>("transactions", data);
}

export async function updateTransaction(id: string, data: Transaction) {
	return api.PUT<Transaction>("transactions/" + id, data);
}

export async function deleteTransactionById(id: string) {
	return api.DELETE<Transaction>(`transactions/${id}`);
}

export async function getSeveralTransactions(queryParams?: {}) {
	return api.GET<Transaction[]>("transactions", queryParams);
}

export async function createSeveralTransactions(data: Transaction[]) {
	return api.POST<Transaction[]>("transactions", data);
}

export async function updateSeveralTransactions(data: Partial<Transaction[]>) {
	return api.PUT<Transaction[]>("transactions", data);
}

export async function deleteSeveralTransactions(ids: Pick<Transaction, "id">[]) {
	return api.DELETE<Transaction>("transactions", { ids });
}
