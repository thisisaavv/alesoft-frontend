"use client";

import * as React from "react";

import { Columns } from "../../types";
import { UserRole } from "@/lib/validations/user-roles";
import { DataTable } from "@/components/data-table";
import { serialiseColumns } from "@/components/data-table-columns";
import { useGetSeveralUserRoles } from "@/hooks/user-role/use-get-several-user-roles";
import { useDeleteUserRole } from "@/hooks/user-role/use-delete-user-role";
import { Action } from "@/components/data-table-row-actions";

const columnsDef: Columns<UserRole>[] = [
	{
		key: "name",
		title: "Nombre",
	},
	{
		key: "description",
		title: "Descripción",
	},
];

const actions = ({ deleteUserRole }: any): Action<UserRole> => {
	return {
		delete: {
			title: "Eliminar",
			onClick: ({ row }) => {
				if (!confirm("¿Estás seguro de eliminar este rol de usuario?")) return;
				deleteUserRole({ id: row.original.id });
			},
		},
		disabled: {
			title: ["Habilitar", "Deshabilitar"],
			onClick: function () {
				this.title = this.title.reverse()[0];
				console.log(this.title);
			},
		},
	};
};

export function UserRoleTable() {
	const severalUserRolesQuery = useGetSeveralUserRoles();
	const deleteUserRoleQuery = useDeleteUserRole();

	const userRolesList = severalUserRolesQuery.data?.data?.data || [];
	const rowActions = actions({ deleteUserRole: deleteUserRoleQuery.mutate });
	const userRoleColumns = serialiseColumns<UserRole>(columnsDef, rowActions);

	return (
		<DataTable filterBy={{ name: "Nombre" }} columns={userRoleColumns} data={userRolesList} />
	);
}
