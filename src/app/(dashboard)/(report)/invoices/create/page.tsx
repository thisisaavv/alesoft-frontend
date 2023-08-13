import { Metadata } from "next";
import { ItemCategoryForm } from "@/components/forms/item-category-form";

export const metadata: Metadata = {
	title: "Crear Factura",
	description: "Crear Factura",
};

export default function InvoiceRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Factura</h2>
				</div>
			</div>
			{/* <ItemCategoryForm /> */}
		</>
	);
}
