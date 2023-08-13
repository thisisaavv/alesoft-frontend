"use client";

import { useParams } from "next/navigation";

import { ViewDetails } from "@/components/details-view";
import { useGetPurchase } from "@/hooks/purchase/use-get-purchase";

const publicHeaders = {
	id: "ID",
	total: "Total",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function PurchaseDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getPurchaseQuery = useGetPurchase(id);
	const { data, isLoading } = getPurchaseQuery;
	const purchaseData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Detalles de Compra</h2>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={purchaseData} />}
		</>
	);
}
