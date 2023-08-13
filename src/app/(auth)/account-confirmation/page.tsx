"use client";

import * as React from "react";

export default function AccountConfirmedPage() {
	React.useEffect(() => {
		setTimeout(() => {
			window.location.href = "/signin";
		}, 4000);
	}, []);

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
				<h1 className="text-2xl font-bold">Cuenta Confirmada</h1>
				<p className="mt-2">Su cuenta ha sido confirmada exitosamente.</p>
				<p className="mt-2">
					Ya puede iniciar sesión en la aplicación con su usuario y contraseña.
				</p>
				<p
					className="mt-2 text-sm text-gray-800"
					dangerouslySetInnerHTML={{
						__html: `Si no es redirigido automáticamente, haga <a href="/signin" style="text-decoration: underline;">click aquí</a>.`,
					}}
				/>
			</div>
		</div>
	);
}
