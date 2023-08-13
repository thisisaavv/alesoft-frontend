import { Metadata } from "next";
import { ItemForm } from "@/components/forms/item-form";

export const metadata: Metadata = {
	title: "Crear Item",
	description: "Crear Item",
};

export default function ItemRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Producto</h2>
				</div>
			</div>
			<ItemForm />
		</>
	);
}
