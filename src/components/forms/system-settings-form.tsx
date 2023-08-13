"use client";

import * as React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parameterSchema } from "@/lib/validations/parameter";
import { useUpdateSeveralParameters } from "@/hooks/parameter/use-update-several-parameters";

const parameterFormSchema = z.object({
	parameters: z.array(parameterSchema),
});

type Parameter = z.infer<typeof parameterFormSchema>;

export function SystemSettingsForm(props: { data?: any }) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: updateManyParameter } = useUpdateSeveralParameters();

	const form = useForm<Parameter>({
		resolver: zodResolver(parameterFormSchema),
		defaultValues: props.data,
	});

	function onSubmit(data: Parameter) {
		updateManyParameter({
			ids: ["1", "2", "3"],
			data: data.parameters,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{form.getValues("parameters").map((parameter: any, index: number) => (
					<FormField
						key={parameter.id}
						control={form.control}
						name={`parameters.${index}.value`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{parameter.name || "No definido"}</FormLabel>
								<FormDescription>
									{parameter.description || "No definido"}
								</FormDescription>
								<FormControl>
									<Input
										disabled={!parameter.enabled}
										{...field}
										type="text"
										autoCorrect="off"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<Button type="submit">Actualizar parámetros</Button>
			</form>
		</Form>
	);
}
