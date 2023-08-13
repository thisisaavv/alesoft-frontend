"use client";

import { Separator } from "@/components/ui/separator";
import { BillingForm } from "@/components/forms/billing-form";
import { useGetSeveralInvoiceLotes } from "@/hooks/invoice-lote/use-get-several-invoice-lotes";

export default function SettingsAccountPage() {
	const { data: severalInvoiceLotes, isLoading: isLoadingInvoiceLotes } =
		useGetSeveralInvoiceLotes();
	const invoiceLoteData = severalInvoiceLotes?.data?.data || [];

	if (isLoadingInvoiceLotes) return <div>Cargando...</div>;

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Facturación</h3>
				<p className="text-sm text-muted-foreground">
					Actualiza los datos de facturación de tu empresa.
				</p>
			</div>
			<Separator />
			<BillingForm data={invoiceLoteData[0]} />
		</div>
	);
}
