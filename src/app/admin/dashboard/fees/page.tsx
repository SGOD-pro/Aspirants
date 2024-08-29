"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];
const items = [
	{
		id: "recents",
		label: "Recents",
	},
	{
		id: "home",
		label: "Home",
	},
	{
		id: "applications",
		label: "Applications",
	},
	{
		id: "desktop",
		label: "Desktop",
	},
	{
		id: "downloads",
		label: "Downloads",
	},
	{
		id: "documents",
		label: "Documents",
	},
] as const;

const FormSchema = z.object({
	items: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one item.",
	}),
});

export default function CheckboxReactHookFormMultiple() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: ["recents", "home"],
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
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
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="items"
						render={() => (
							<FormItem>
								<div className="mb-4">
									<FormLabel className="text-base">Sidebar</FormLabel>
									<FormDescription>
										Select the items you want to display in the sidebar.
									</FormDescription>
								</div>
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<Button variant="outline">Open</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56">
										<DropdownMenuLabel>Appearance</DropdownMenuLabel>
										<DropdownMenuSeparator />
										{items.map((item) => (
											<FormField
												key={item.id}
												control={form.control}
												name="items"
												render={({ field }) => {
													return (
														<DropdownMenuItem
															onSelect={(event) => event.preventDefault()}
														>
															<FormItem
																key={item.id}
																className="flex flex-row items-start space-x-3 space-y-0"
															>
																<FormControl className="space-y-4">
																	<Checkbox
																		checked={field.value?.includes(item.id)}
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange([
																						...field.value,
																						item.id,
																				  ])
																				: field.onChange(
																						field.value?.filter(
																							(value) => value !== item.id
																						)
																				  );
																		}}
																	/>
																</FormControl>
																<FormLabel className="font-normal">
																	{item.label}
																</FormLabel>
															</FormItem>
														</DropdownMenuItem>
													);
												}}
											/>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</>
	);
}
