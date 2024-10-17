import { addTopersSchema } from "@/schema/ToperSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { memo, useRef, useState } from "react";
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
import Image from "next/image";

function AddTopers() {
	const form = useForm<z.infer<typeof addTopersSchema>>({
		resolver: zodResolver(addTopersSchema),
	});
	const { addToper } = getTopersStore();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [key, setKey] = React.useState(0);
	const [preview, setPreview] = useState<string | null>(null); // State to store the preview URL

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
		setKey((prev) => prev + 1);
		setPreview(null); // Reset the preview on submit
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	}

	// Function to handle image preview
	const handleImagePreview = (file: File | null) => {
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setPreview(objectUrl);
		} else {
			setPreview(null);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-2"
				key={key}
			>
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
							<div className="flex items-center gap-2">
								<div className="">
									<FormLabel>Photo</FormLabel>
									<FormControl className="w-[220px] sm:w-fit">
										<FileInput
											onChange={(file) => {
												field.onChange(file);
												handleImagePreview(file); // Call the image preview handler
											}}
											accept="image/*"
											ref={fileInputRef}
										/>
									</FormControl>
								</div>
								<FormLabel className="w-24 h-24 sm:w-32 sm:h-32 cursor-pointer">
									<Image
										src={preview || "/default_user.svg"}
										alt="Preview"
										className="w-full h-full object-cover rounded-full border"
										width={200}
										height={200}
									/>
								</FormLabel>
							</div>
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
									placeholder="Achivements of the toper...!"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isSubmitting}>
					Submit
				</Button>
			</form>
		</Form>
	);
}

export default memo(AddTopers);
