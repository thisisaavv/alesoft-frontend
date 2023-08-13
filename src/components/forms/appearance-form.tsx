"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";

const appearanceFormSchema = z.object({
	theme: z
		.enum(["light", "dark", "system"], {
			required_error: "Please select a theme.",
		})
		.optional(),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AppearanceFormValues> = {
	theme: "system",
};

export function AppearanceForm() {
	const { setTheme, theme } = useTheme();

	const form = useForm<AppearanceFormValues>({
		resolver: zodResolver(appearanceFormSchema),
		defaultValues: {
			theme: theme as any,
		},
	});

	function onSubmit(data: AppearanceFormValues) {
		setTheme(data.theme as any);

		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="theme"
					render={({ field }) => (
						<FormItem className="space-y-1">
							<FormLabel>Tema de la aplicación</FormLabel>
							{/* <FormDescription>Select the theme for the dashboard.</FormDescription> */}
							<FormMessage />
							<RadioGroup
								onValueChange={field.onChange as any}
								defaultValue={field.value}
								className="grid max-w-md grid-cols-2 gap-8 pt-"
							>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="light" className="sr-only" />
										</FormControl>
										<div className="items-center p-1 border-2 rounded-md border-muted hover:border-accent">
											<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
												<div className="p-2 space-y-2 bg-white rounded-md shadow-sm">
													<div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
													<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
												</div>
												<div className="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm">
													<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
													<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
												</div>
												<div className="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm">
													<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
													<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
												</div>
											</div>
										</div>
										<span className="block w-full p-2 font-normal text-center">
											Claro
										</span>
									</FormLabel>
								</FormItem>
								<FormItem>
									<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
										<FormControl>
											<RadioGroupItem value="dark" className="sr-only" />
										</FormControl>
										<div className="items-center p-1 border-2 rounded-md border-muted bg-popover hover:bg-accent hover:text-accent-foreground">
											<div className="p-2 space-y-2 rounded-sm bg-slate-950">
												<div className="p-2 space-y-2 rounded-md shadow-sm bg-slate-800">
													<div className="h-2 w-[80px] rounded-lg bg-slate-400" />
													<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
												</div>
												<div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
													<div className="w-4 h-4 rounded-full bg-slate-400" />
													<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
												</div>
												<div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
													<div className="w-4 h-4 rounded-full bg-slate-400" />
													<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
												</div>
											</div>
										</div>
										<span className="block w-full p-2 font-normal text-center">
											Oscuro
										</span>
									</FormLabel>
								</FormItem>
							</RadioGroup>
						</FormItem>
					)}
				/>

				<Button type="submit">Guardar cambios</Button>
			</form>
		</Form>
	);
}
