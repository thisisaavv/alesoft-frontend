import axios, { AxiosInterceptorOptions, InternalAxiosRequestConfig } from "axios";
import { AxiosRequestConfig, AxiosResponse, Method } from "axios";

const axiosClient = axios.create({
	baseURL: "http://34.125.66.190:3000/v1/",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem("token");
	if (token) config.headers!.Authorization = `Bearer ${token}`;
	return config;
});

export const EndPoints = {
	auth: "auth",
	users: "users",
	roles: "roles",
	reports: "reports",
	files: "files",
	branches: "branches",
	cashboxes: "cashboxes",
	terminals: "terminals",
	sales: "sales",
	items: "items",
	employees: "employees",
	customers: "customers",
	jobs: "jobs",
	permissions: "permissions",
} as const;

type EndPointType = typeof EndPoints;
type EndPointsKeys = keyof EndPointType;

export type EndPointsValues = EndPointType[EndPointsKeys];

// https://github.com/webmasterdevlin/zustand-immer-react-query-course/blob/master/src/axios/generic-api-calls.ts

export class API {
	private static instance: API;

	public static getInstance(): API {
		if (!API.instance) API.instance = new API();
		return API.instance;
	}

	public async request(
		method: Method,
		url: string,
		body?: any,
		params?: AxiosRequestConfig<any> | undefined
	): Promise<AxiosResponse>;
	public async request<T>(
		method: Method,
		url: string,
		body?: any,
		params?: AxiosRequestConfig<any> | undefined
	): Promise<AxiosResponse<T>>;
	public async request<T>(
		method: any,
		url: any,
		body?: any,
		params?: any
	): Promise<AxiosResponse<T>> {
		const existBodyToken = typeof body?.token === "string" || body?.token !== undefined;

		return await axiosClient
			.request<T>({
				method,
				url,
				data: body,
				params,
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					...(existBodyToken && { Authorization: `Bearer ${body.token}` }),
				},
			})
			.then((res) => res)
			.catch((err) => err.response);
		// .finally(() => {
		// 	console.log({
		// 		method,
		// 		url,
		// 		data: body,
		// 		params,
		// 	});
		// })
	}

	public async GET<T>(url: string, queryParams?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
	public async GET<T>(url: string, queryParams?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
	public async GET<T>(
		url: EndPointsValues,
		queryParams?: AxiosRequestConfig
	): Promise<AxiosResponse<T>>;
	public async GET<T>(url: any, queryParams: any) {
		if (queryParams) return await this.request<T>("GET", url, undefined, queryParams);
		return await this.request<T>("GET", url);
	}

	public async POST<T>(url: EndPointsValues, data?: Partial<T>): Promise<AxiosResponse<T>>;
	public async POST<T>(url: string, data?: Partial<T>): Promise<AxiosResponse<T>>;
	public async POST<T>(url: any, data?: any): Promise<AxiosResponse<T>> {
		return await this.request<T>("POST", url, data);
	}

	public async PUT<T>(url: EndPointsValues, data: Partial<T>): Promise<AxiosResponse<T>>;
	public async PUT<T>(url: string, data: Partial<T>): Promise<AxiosResponse<T>>;
	public async PUT<T>(url: any, data: any): Promise<AxiosResponse<T>> {
		return await this.request<T>("PUT", url, data);
	}

	public async PATCH<T>(url: EndPointsValues, data: Partial<T>): Promise<AxiosResponse<T>>;
	public async PATCH<T>(url: string, data: Partial<T>): Promise<AxiosResponse<T>>;
	public async PATCH<T>(url: any, data: any): Promise<AxiosResponse<T>> {
		return await this.request<T>("PUT", url, data);
	}

	public async DELETE<T>(
		url: EndPointsValues,
		body?: Partial<T> | any,
		params?: AxiosRequestConfig
	): Promise<AxiosResponse<T>>;
	public async DELETE<T>(
		url: string,
		body?: Partial<T> | any,
		params?: AxiosRequestConfig
	): Promise<AxiosResponse<T>>;
	public async DELETE<T>(url: any, body?: any, params?: any): Promise<AxiosResponse<T>> {
		return await this.request<T>("DELETE", url, body, params);
	}
}
