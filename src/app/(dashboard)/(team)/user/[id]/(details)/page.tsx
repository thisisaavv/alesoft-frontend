"use client";

import { useParams, useSearchParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetUser } from "@/hooks/user/use-get-user";

const publicHeaders = {
	id: "ID",
	username: "Nombre de usuario",
	email: "Correo electrónico",
	employee_id: "Empleado",
	user_role_id: "Rol",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
	verified: "Verificado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function UserDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getUserQuery = useGetUser(id);
	const { data, isLoading } = getUserQuery;
	const userData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Usuario</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={userData} />}
		</>
	);
}
