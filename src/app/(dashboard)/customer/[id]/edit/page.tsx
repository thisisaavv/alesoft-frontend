"use client";

import { useParams } from "next/navigation";

import { useGetCustomer } from "@/hooks/customer/use-get-customer";
import { CustomerForm } from "@/components/forms/customer-form";

export default function EmployeeEditPage() {
	const params = useParams();
	const id = params.id as string;
	const { data: customerResponse, isLoading } = useGetCustomer(id);
	const customerData = customerResponse?.data;

	if (isLoading) return <div>Cargando...</div>;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Modificar Cliente</h2>
			</div>
			<CustomerForm data={customerData} />
		</>
	);
}
