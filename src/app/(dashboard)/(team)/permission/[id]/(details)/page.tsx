"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@/components/details-view";
import { useGetUserRole } from "@/hooks/user-role/use-get-user-role";

const publicHeaders = {
	id: "ID",
	user_id: "Nombre de usuario",
	name: "Nombre",
	description: "Descripción",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	enabled: "Habilitado",
	verified: "Verificado",
	users_permission: "Acceso a Usuarios",
	user_roles_permission: "Acceso a Roles de Usuario",
	employees_permission: "Acceso a Empleados",
	customers_permission: "Acceso a Clientes",
	sales_permission: "Acceso a Ventas",
	purchases_permission: "Acceso a Compras",
	items_permission: "Acceso a Artículos",
	providers_permission: "Acceso a Proveedores",
	inventories_permission: "Acceso a Inventarios",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function UserRoleDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getUserQuery = useGetUserRole(id);
	const { data, isLoading } = getUserQuery;
	const userData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Rol</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={userData} />}
		</>
	);
}
