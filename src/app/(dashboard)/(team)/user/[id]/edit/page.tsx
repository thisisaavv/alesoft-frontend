"use client";

import { UserForm } from "@/components/forms/user-form";
import { useParams } from "next/navigation";
import { useGetUser } from "@/hooks/user/use-get-user";

export default function UserEditPage() {
	const params = useParams();
	const id = params.id as string;
	const getUserQuery = useGetUser(id);
	const { data, isLoading, isError, error } = getUserQuery;

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	if (isError) {
		return <div>Error: {<>{error}</>}</div>;
	}

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Modificar Usuario</h2>
				</div>
				{/* <div className="flex items-center space-x-2">Acciones</div> */}
			</div>
			<UserForm data={data.data} />
		</>
	);
}
