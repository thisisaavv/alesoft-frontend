import { Metadata } from "next";
import { ItemModifierForm } from "@/components/forms/item-modifier-form";

export const metadata: Metadata = {
	title: "Crear Modificador",
	description: "Crear Modificador",
};

export default function ItemModifierRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Crear Modificador</h2>
			</div>
			<ItemModifierForm />
		</>
	);
}
