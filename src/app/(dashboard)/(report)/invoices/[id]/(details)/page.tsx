"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetInvoice } from "@/hooks/invoice/use-get-invoice";

const publicHeaders = {
	id: "ID",
	cai_number: "Número de CAI",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function InvoiceDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getInvoiceQuery = useGetInvoice(id);
	const { data, isLoading } = getInvoiceQuery;
	const invoiceData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Factura</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={invoiceData} />}
		</>
	);
}
