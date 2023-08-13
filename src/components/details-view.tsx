"use client";

import { formatValue } from "@/lib/utils";

interface ViewDetailsProps {
	data: any;
	headers: any;
}

export function ViewDetails({ data, headers }: ViewDetailsProps) {
	return (
		<>
			{Object.keys(data).map((key) => {
				if (key in headers) {
					return (
						<div key={key} className="flex items-center justify-between">
							<div className="text-sm text-gray-500">{headers[key]}</div>
							<div className="text-sm font-medium">{formatValue(data[key])}</div>
						</div>
					);
				}
			})}
		</>
	);
}
