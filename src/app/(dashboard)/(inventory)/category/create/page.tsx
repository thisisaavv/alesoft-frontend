import { Metadata } from "next";
import { ItemCategoryForm } from "@/components/forms/item-category-form";

export const metadata: Metadata = {
	title: "Crear Categoría",
	description: "Crear Categoría",
};

export default function ItemCategoryRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Categoría</h2>
				</div>
			</div>
			<ItemCategoryForm />
		</>
	);
}
