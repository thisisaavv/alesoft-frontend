"use client";

import * as React from "react";

import { User } from "@/lib/validations/user";
import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { useGetSeveralUsers } from "@/hooks/user/use-get-several-users";
import { useDeleteUser } from "@/hooks/user/use-delete-user";
import { Columns } from "../../types";
import { Action } from "@/components/data-table-row-actions";
import { useUpdateUser } from "@/hooks/user/use-update-user";
import { useRecoverAccount } from "@/hooks/auth/use-recover-account";

const columnsDef: Columns<User>[] = [
	{
		key: "employee_name" as any,
		title: "Empleado",
	},
	{
		key: "username",
		title: "Nombre de usuario",
	},
	{
		key: "email",
		title: "Correo electrónico",
	},
	{
		key: "user_role_name" as any,
		title: "Rol",
	},
	{
		key: "enabled",
		title: "Habilitado",
	},
	{
		key: "verified",
		title: "Verificado",
	},
];

const actions = ({ deleteUser, enableOrDisableUser, recoverAccount }: any): Action<User> => ({
	delete: {
		title: "Eliminar",
		onClick: ({ row }) => {
			if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
			deleteUser({ id: row.original.id });
		},
	},
	disabled: {
		title: ["Habilitar", "Deshabilitar"],
		onClick: ({ row }) => {
			if (!confirm("¿Estás seguro de cambiar deshabilitar este usuario?")) return;
			enableOrDisableUser({ id: row.original.id, data: { enabled: !row.original.enabled } });
		},
	},
	changePassword: {
		title: "Cambiar contraseña",
		onClick: ({ row }) => {
			if (!confirm("¿Estás seguro de cambiar la contraseña de este usuario?")) return;
			console.log(row.original.email);
			recoverAccount({ email: row.original.email });
		},
	},
});

export function UserTable() {
	const severalUsersQuery = useGetSeveralUsers();
	const deleteUserQuery = useDeleteUser();
	const enableOrDisableUserQuery = useUpdateUser();
	const recoverAccountQuery = useRecoverAccount();

	const usersList = severalUsersQuery.data?.data?.data || [];
	const usersListFiltered = usersList?.map((user: any) => ({
		...user,
		employee_name: user?.Employee
			? user.Employee?.first_name +
			  (user.Employee.middle_name ? " " + user.Employee?.middle_name + " " : " ") +
			  user.Employee?.last_name
			: null,
		user_role_name: user?.UserRole?.name,
	}));
	const rowActions = actions({
		deleteUser: deleteUserQuery.mutate,
		enableOrDisableUser: enableOrDisableUserQuery.mutate,
		recoverAccount: recoverAccountQuery.mutate,
	});
	const userColumns = serialiseColumns<User>(columnsDef, rowActions);

	return (
		<DataTable
			filterBy={{ employee_name: "Empleado" }}
			columns={userColumns}
			data={usersListFiltered}
		/>
	);
}
