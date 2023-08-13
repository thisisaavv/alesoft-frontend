"use client";

import { useParams } from "next/navigation";
import { ViewDetails } from "@/components/details-view";
import { useGetDiscount } from "@/hooks/discount/use-get-discount";

const publicHeaders = {
	id: "ID",
	name: "Nombre",
	note: "Nota",
	amount: "Monto",
	amount_type: "Tipo de monto",
};

const protectedHeaders = {
	created_at: "Fecha de creación",
	updated_at: "Fecha de modificación",
	created_by: "Creado por",
	enabled: "Habilitado",
};

const headers = { ...publicHeaders, ...protectedHeaders };

export default function DiscountDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const getDiscountQuery = useGetDiscount(id);
	const { data, isLoading } = getDiscountQuery;
	const discountData = data?.data;

	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Detalles de Descuento</h2>
				</div>
				<div className="flex items-center space-x-2">{/* Acciones */}</div>
			</div>
			{!isLoading && <ViewDetails headers={headers} data={discountData} />}
		</>
	);
}
