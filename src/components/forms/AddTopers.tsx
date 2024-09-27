import { addTopersSchema } from "@/models/ToperSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { memo, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import FileInput from "../ui/FileInput";
import { toast } from "../ui/use-toast";
import getTopersStore from "@/store/Topers";
function AddTopers() {
	const form = useForm<z.infer<typeof addTopersSchema>>({
		resolver: zodResolver(addTopersSchema),
	});
	const { addToper } = getTopersStore();
	const fileInputRef = useRef<HTMLInputElement>(null);

	async function onSubmit(values: z.infer<typeof addTopersSchema>) {
		console.log(values);
		const response = await addToper(values);
		if (!response.success) {
			toast({
				title: "Error",
				description: "Something went wrong",
				variant: "destructive",
			});
		} else {
			toast({
				title: "Success",
				description: "Toper added",
			});
		}
		form.reset();

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Name" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="photo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Photo</FormLabel>
							<FormControl>
								<FileInput
									onChange={(file) => field.onChange(file)} // Ensure file change is handled
									accept="image/*"
									ref={fileInputRef}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="details"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Details</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about yourself"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isSubmitting}>Submit</Button>
			</form>
		</Form>
	);
}

export default memo(AddTopers);
