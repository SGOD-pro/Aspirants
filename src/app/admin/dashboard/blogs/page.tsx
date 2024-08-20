"use client";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import blogShema from "@/models/BlogSchema";
import { Button } from "@/components/ui/button";

function BlogForm() {
	const form = useForm<z.infer<typeof blogShema>>({
		resolver: zodResolver(blogShema),
	});
	async function onSubmit(values: z.infer<typeof blogShema>) {
		console.log(values);
		// const { email, password } = values;
		// setDisable(true);
		// const response = await login(email, password);
		// if (response.success) {
		// 	console.log("Success", response);
		// 	route.push("/admin/dashboard");
		// } else {
		// 	toast({
		// 		title: "Invalid Credentials",
		// 		description: `${response?.error}` || "Something went wrong",
		// 		variant: "destructive",
		// 	});
		// 	setDisable(false);
		// }
	}
	return (
		<div className="overflow-hidden">
			<Header>
				<h1 className="text-3xl font-bold">Upload blog</h1>
			</Header>
			<Container>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 p-1 md:p-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input
											placeholder="Title"
											{...field}
											className="max-w-72"
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
									<FormLabel>Description</FormLabel>
									<FormControl className="">
										<div className="h-[75dvh]">
											<Editor
												apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
												init={{
													height: "100%",
													menubar: true,
													plugins: [
														"advlist",
														"autolink",
														"lists",
														"link",
														"image",
														"charmap",
														"print",
														"preview",
														"anchor",
														"searchreplace",
														"visualblocks",
														"code",
														"fullscreen",
														"insertdatetime",
														"media",
														"table",
														"paste",
														"help",
														"wordcount",
													],
													toolbar:
														"undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent removeformat | help",
													content_style: `
                body, html, .mce-content-body {
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  border-radius: 8rem;
                  background-color: black;
                  color: white;resize: none
                }
              `,
													placeholder: "Write here...",
													skin: "oxide-dark",
													content_css: "dark",
												}}
												onEditorChange={(content) => {
													form.setValue("description", content);
												}}
											/>
										</div>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</Container>
		</div>
	);
}

export default BlogForm;
