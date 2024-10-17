"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getCourseStore } from "@/store/CoursesStore";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const FormSchema = z.object({
	subject: z.string().min(2, {
		message: "Subject must be at least 2 characters.",
	}),
});
const { pushSubjects } = getCourseStore();
export default function Addsubject() {
	const [key, setKey] = useState(0)
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			subject: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const response = await pushSubjects({ name: data.subject });
		if (response.success) {
			toast({
				title: "Subject added!",
			});
			setKey((prev) => prev + 1);
			form.reset();
		} else {
			toast({
				title: "Error",
				description: `${response.error}` || "Something went wrong",
				variant: "destructive",
			});
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.stopPropagation();
					form.handleSubmit(onSubmit)(e);
				}}
				className="space-y-6"
				key={key}
			>
				<FormField
					control={form.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<FormControl>
								<Input placeholder="Subject.." {...field} required />
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
