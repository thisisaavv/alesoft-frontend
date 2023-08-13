import { Employee } from "@/lib/validations/employee";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getEmployee(id: string) {
	return api.GET<Employee>(`employees/${id}`);
}

export async function createEmployee(data: Employee) {
	return api.POST<Employee>("employees", data);
}

export async function updateEmployee(id: string, data: Employee) {
	return api.PUT<Employee>("employees/" + id, data);
}

export async function deleteEmployeeById(id: string) {
	return api.DELETE<Employee>(`employees/${id}`);
}

export async function getSeveralEmployees(queryParams?: {}) {
	return api.GET<Employee[]>("employees", queryParams);
}

export async function createSeveralEmployees(data: Employee[]) {
	return api.POST<Employee[]>("employees", data);
}

export async function updateSeveralEmployees(data: Partial<Employee[]>) {
	return api.PUT<Employee[]>("employees", data);
}

export async function deleteSeveralEmployees(ids: Pick<Employee, "id">[]) {
	return api.DELETE<Employee>("employees", { ids });
}
