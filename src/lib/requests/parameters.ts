import { Parameter } from "@/lib/validations/parameter";
import { API } from "@/lib/axios";

const api = API.getInstance();

export async function getParameter(id: string) {
	return api.GET<Parameter>(`parameters/${id}`);
}

export async function createParameter(data: Parameter) {
	return api.POST<Parameter>("parameters", data);
}

export async function updateParameter(id: string, data: Parameter) {
	return api.PUT<Parameter>("parameters/" + id, data);
}

export async function deleteParameterById(id: string) {
	return api.DELETE<Parameter>(`parameters/${id}`);
}

export async function getSeveralParameters(queryParams?: {}) {
	return api.GET<Parameter[]>("parameters", queryParams);
}

export async function createSeveralParameters(data: Parameter[]) {
	return api.POST<Parameter[]>("parameters", data);
}

export async function updateSeveralParameters(data: any) {
	return api.PUT<Parameter[]>("parameters/several", data);
}

export async function deleteSeveralParameters(ids: Pick<Parameter, "id">[]) {
	return api.DELETE<Parameter>("parameters", { ids });
}
