import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const sleep = (ms: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
	const date = new Date(input);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export function formatCurrency(value: number) {
	return new Intl.NumberFormat("es-HN", {
		style: "currency",
		currency: "HNL",
	}).format(value);
}

export function formatValue(value: any) {
	const type = Array.isArray(value) ? "array" : typeof value;

	const types: any = {
		array: (value: any) => value.join(", "),
		object: (value: any) => (value ? JSON.stringify(value) : "Ninguno"),
		boolean: (value: any) => (value ? "Sí" : "No"),
		undefined: (value: any) => value ?? "Ninguno",
	};
	if (type in types) return types[type](value);

	return value;
}

export function formatList(
	list: any[],
	label: string | string[],
	value: string
): { label: string; value: string }[] | undefined {
	if (typeof label === "string") {
		return list.map((item) => ({
			label: item[label],
			value: item[value],
		}));
	}

	if (Array.isArray(label)) {
		return list.map((item) => ({
			label: label.map((key) => item[key]).join(" "),
			value: item[value],
		}));
	}
}

export interface IObject<T> {
	[key: string]: T;
}

export function clearObject<T>(object: T, keys?: string[]): IObject<T> {
	const newObject: IObject<T> = {};
	for (const key in object) {
		if (keys?.includes(key)) continue;
		newObject[key] = object[key] as any;
	}

	return newObject;
}

const isVoid = (value: unknown) =>
	value === undefined || value === null || value === "" || value === 0 || value === false;

export const cleanObject = <T>(object: T): T => {
	const result: any = { ...object };

	Object.keys(result).forEach((key) => {
		const value = result[key];

		if (isVoid(value)) {
			delete result[key];
		}
	});

	return result;
};
