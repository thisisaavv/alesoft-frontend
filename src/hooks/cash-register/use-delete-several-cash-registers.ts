import { useMutation } from "@tanstack/react-query";

import { deleteSeveralCashRegisters } from "@/lib/requests/cash-registers";

export function useDeleteSeveralCashRegisters() {
	return useMutation({
		mutationFn: (data: any) => deleteSeveralCashRegisters(data),
	});
}
