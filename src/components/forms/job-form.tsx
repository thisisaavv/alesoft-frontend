"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

import { Job, jobSchema } from "@/lib/validations/job";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clearObject, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUpdateJob } from "@/hooks/job/use-update-job";
import { useCreateJob } from "@/hooks/job/use-create-job";
import { Textarea } from "@/components/ui/textarea";

interface JobFormProps extends React.HTMLAttributes<HTMLDivElement> {
	data?: Job;
}

export function JobForm({ className, ...props }: JobFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate: createJob } = useCreateJob();
	const { mutate: updateJob } = useUpdateJob();

	const form = useForm<Job>({
		resolver: zodResolver(jobSchema),
		defaultValues: props.data ?? {
			name: "",
			description: "",
		},
	});

	const onSubmit: SubmitHandler<Job> = (formData: Job) => {
		const formDataFormatted = clearObject(formData);

		if (props.data) {
			return updateJob({ id: props.data.id, data: formDataFormatted });
		}

		createJob({ data: formDataFormatted });
		form.reset();
	};

	return (
		<div className="max-w-2xl">
			<Form {...form}>
				<div className={cn("grid gap-6", className)} {...props}>
					<form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												placeholder="e.g. Cocinero"
												autoCorrect="off"
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descripción</FormLabel>
										<FormControl>
											<Textarea {...field} disabled={isLoading} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-4">
								<Button isLoading={isLoading}>
									{props.data ? "Actualizar" : "Registrar"}
								</Button>
								<Button
									variant="outline"
									type="reset"
									onClick={() => {
										form.setFocus("name");
										form.reset();
									}}
								>
									Cancelar
								</Button>
							</div>
						</div>
					</form>
				</div>
			</Form>
		</div>
	);
}
