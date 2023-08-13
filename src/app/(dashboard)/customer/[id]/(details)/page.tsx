"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@/components/details-view";
import { useGetCustomer } from "@/hooks/customer/use-get-customer";

const publicHeaders = {
	id: "ID",
	first_name: "Primer nombre",
	middle_name: "Segundo nombre",
	last_name: "Apellido",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function CustomerDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getCustomerQuery = useGetCustomer(id);
	const { data, isLoading } = getCustomerQuery;
	const customerData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Cliente</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={customerData} />}
		</>
	);
}
