"use client";
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGalleryStore } from "@/global/GalleryStore";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import FileInput from "../ui/FileInput";
import { toast } from "../ui/use-toast";
const FormSchema = z.object({
	image: z
		.instanceof(File)
		.refine((file) => file.size < 5 * 1024 * 1024, {
			message: "File must be smaller than 5MB",
		})
		.refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
			message: "File must be an image (JPEG or PNG)",
		}),
});

export default function Gallery() {
	const { addImages } = useGalleryStore();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});
const [disable, setDisable] = React.useState(false)
	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setDisable(true)
		const response = await addImages(data.image);
		setDisable(false)
		if (response.success) {
			toast({
				title: "Imgae added!",
			});
		} else {
			toast({
				title: "Error",
				description: `${response.error}` || "Something went wrong",
				variant: "destructive",
			});
		}
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							<FormControl>
								<FileInput
									onChange={(file) => field.onChange(file)}
									accept="image/*"
									ref={fileInputRef}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit"
				disabled={disable}>Submit</Button>
			</form>
		</Form>
	);
}
