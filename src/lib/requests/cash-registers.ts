import { CashRegister } from "@/lib/validations/cash-register";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getCashRegister(id: string) {
	return api.GET<CashRegister>(`cash-registers/${id}`);
}

export async function createCashRegister(data: CashRegister) {
	return api.POST<CashRegister>("cash-registers", data);
}

export async function updateCashRegister(id: string, data: CashRegister) {
	return api.PUT<CashRegister>("cash-registers/" + id, data);
}

export async function deleteCashRegisterById(id: string) {
	return api.DELETE<CashRegister>(`cash-registers/${id}`);
}

export async function getSeveralCashRegisters(queryParams?: {}) {
	return api.GET<CashRegister[]>("cash-registers", queryParams);
}

export async function createSeveralCashRegisters(data: CashRegister[]) {
	return api.POST<CashRegister[]>("cash-registers", data);
}

export async function updateSeveralCashRegisters(data: Partial<CashRegister[]>) {
	return api.PUT<CashRegister[]>("cash-registers", data);
}

export async function deleteSeveralCashRegisters(ids: Pick<CashRegister, "id">[]) {
	return api.DELETE<CashRegister>("cash-registers", { ids });
}
