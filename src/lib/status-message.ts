enum Status {
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	INTERNAL_SERVER_ERROR = 500,
}

type Action = "create" | "update" | "delete" | "retrieve";

export function httpStatusMessages(status: Status, action: Action, message?: string) {
	const response: {
		[key in Action]: {
			[key in Status]?: string;
		};
	} = {
		create: {
			201: `Se ha creado correctamente.`,
			400: `Ha ocurrido un error inesperado.`,
			409: `Este registro ya existe`,
		},
		update: {
			200: `Se ha actualizado correctamente.`,
		},
		delete: {
			200: `Se ha eliminado correctamente.`,
		},
		retrieve: {
			200: `Se ha obtenido correctamente.`,
		},
	};

	return {
		title: String(status).startsWith("2") ? "Éxito" : "Error",
		message: message ?? (response[action][status] || `Ha ocurrido un error inesperado.`),
	};
}
