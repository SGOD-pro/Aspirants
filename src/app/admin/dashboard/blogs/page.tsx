"use client";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import React, { Suspense } from "react";
import Dialog from "@/components/Dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import blogShema, { blogDataSchema } from "@/models/BlogSchema";
import { Button } from "@/components/ui/button";
import Blogs from "@/components/BlogCards";
import { Skeleton } from "@/components/ui/skeleton";
import FileInput from "@/components/ui/FileInput";
import { readFileContent } from "@/lib/ReadFile";
import matter from "gray-matter";
import { Plus } from "lucide-react";
import { useBlogStore } from "@/store/Blogs";
import { toast } from "@/components/ui/use-toast";
function BlogForm() {
	return (
		<div className="overflow-hidden">
			<Header>
				<Dialog
					content={
						<Suspense fallback={<Skeleton className="w-full h-44" />}>
							<AddBlogForm />
						</Suspense>
					}
					title="Add Event"
				>
					<Button variant={"outline"} className="flex gap-2 items-center">
						<span>Blog</span>
						<Plus />
					</Button>
				</Dialog>
			</Header>
			<Container>
				<Blogs className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1 lg:p-4"/>
			</Container>
		</div>
	);
}

export default BlogForm;

function AddBlogForm() {
	const { addBlog } = useBlogStore();
	const form = useForm<z.infer<typeof blogShema>>({
		resolver: zodResolver(blogShema),
	});
	const [key, setKey] = React.useState(0);
	async function onSubmit(values: z.infer<typeof blogShema>) {
		try {
			const fileData = await readFileContent(values.file);
			const { data, content } = matter(fileData);

			const validation = blogDataSchema.safeParse(data);
			if (!validation.success) {
				console.log("Validation failed:", validation.error);
				toast({
					title: "Error",
					description: validation.error.errors[0].message,
					variant: "destructive",
				});
				return;
			}

			const validData: BlogData = validation.data;

			const response = await addBlog({ data: validData, content });
			if (response.error) {
				toast({
					title: "Error",
					description: response.error.message,
					variant: "destructive",
				});
			}

			form.reset();
			setKey((prev) => prev + 1);
		} catch (error) {
			console.error("Error while submitting blog:", error);
		}
	}

	return (
		<Form {...form} key={key}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 p-1 md:p-4"
			>
				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select the file</FormLabel>
							<FormControl>
								<FileInput
									onChange={(file) => field.onChange(file)}
									accept=".md"
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
