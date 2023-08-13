import { Metadata } from "next";
import { ItemVariantForm } from "@/components/forms/item-variant-form";

export const metadata: Metadata = {
	title: "Crear Variante",
	description: "Crear Variante",
};

export default function ItemVariantRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Crear Variante</h2>
			</div>
			<ItemVariantForm />
		</>
	);
}
