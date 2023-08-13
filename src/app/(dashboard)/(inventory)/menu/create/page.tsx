import { Metadata } from "next";
import { MenuForm } from "@/components/forms/menu-form";

export const metadata: Metadata = {
	title: "Crear Menú",
	description: "Crear Menú",
};

export default function MenuRegisterPage() {
	return (
		<>
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Crear Menú</h2>
				</div>
			</div>
			<MenuForm />
		</>
	);
}
