"use client";
import { coursesSchema } from "@/models/CourseSchema";
import { useForm } from "react-hook-form";
import React, { memo, useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Dialog from "@/components/Dialog";
import Addsubject from "@/components/forms/Addsubject";
import AddUniversity from "@/components/forms/AddUniversity";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getCourseStore } from "@/global/CoursesStore";
import { toast } from "../ui/use-toast";
import { CirclePlus } from "lucide-react";
import { universityStore } from "@/global/Universitys";

function AddCourses() {
	const { pushCourses, subjects } = getCourseStore();
	const { universities } = universityStore((state) => ({
		universities: state.universities,
	}));

	const [disabled, setDisabled] = useState(false);
	const form = useForm<z.infer<typeof coursesSchema>>({
		resolver: zodResolver(coursesSchema),
	});

	const submit = useCallback(
		async (values: z.infer<typeof coursesSchema>) => {
			console.log(values);
			// toast({
			// 	title: "Error",
			// 	description: (
			// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
			// 			<code className="text-white">
			// 				{JSON.stringify(values, null, 2)}
			// 			</code>
			// 		</pre>
			// 	),
			// 	variant: "destructive",
			// });
			setDisabled(true);
			const response = await pushCourses(values);
			setDisabled(false);
			if (response.success) {
				toast({
					title: "Course added!",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">
								{JSON.stringify(values, null, 2)}
							</code>
						</pre>
					),
				});
				form.reset();
			} else {
				toast({
					title: "Error",
					description: `${response.error}` || "Something went wrong",
					variant: "destructive",
				});
			}
		},
		[form]
	);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="mt-3 space-y-4">
				{/* Subject */}
				<FormField
					control={form.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<div className="flex gap-3 ">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a subject" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{subjects &&
											subjects.map((subject) => (
												<SelectItem key={subject.uid} value={subject.name}>
													{subject.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								<Dialog title="Add subject" content={<Addsubject />}>
									<Button
										type="button"
										disabled={disabled}
										size={"icon"}
										variant={"outline"}
									>
										<CirclePlus className="w-4 h-4" />
									</Button>
								</Dialog>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Collage/School */}
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>School/Collage</FormLabel>
							<FormControl>
								<RadioGroup
									className="flex gap-3 mt-2 items-center justify-around"
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormItem className="flex border w-full h-full rounded-lg">
										<label
											htmlFor="school"
											className="w-full px-4 py-3 h-full space-x-3"
										>
											<FormControl>
												<RadioGroupItem value="school" id="school" />
											</FormControl>
											<FormLabel className="font-normal" htmlFor="school">
												School
											</FormLabel>
										</label>
									</FormItem>
									<FormItem className="flex border w-full h-full rounded-lg">
										<label
											htmlFor="collage"
											className="w-full px-4 py-3 h-full space-x-3"
										>
											<FormControl>
												<RadioGroupItem value="collage" id="collage" />
											</FormControl>
											<FormLabel className="font-normal" htmlFor="collage">
												Collage
											</FormLabel>
										</label>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* University/Board */}
				<FormField
					control={form.control}
					name="university"
					render={({ field }) => (
						<FormItem>
							<FormLabel>University/Board</FormLabel>
							<div className="flex gap-3 ">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a university or board" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{universities
											? universities.map((university) => (
													<SelectItem
														key={university.uid}
														value={university.name}
													>
														{university.name}
													</SelectItem>
											  ))
											: null}
									</SelectContent>
								</Select>
								<Dialog title="Add university" content={<AddUniversity />}>
									<Button
										type="button"
										disabled={disabled}
										size={"icon"}
										variant={"outline"}
									>
										<CirclePlus className="w-4 h-4" />
									</Button>
								</Dialog>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Course fees */}
				<div className="grid sm:grid-cols-2 gap-3">
					<FormField
						control={form.control}
						name="fees"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Course fees</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Enter fees"
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="department"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Department\Class</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select department" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="1st">1st Year</SelectItem>
										<SelectItem value="2nd">2nd Year</SelectItem>
										<SelectItem value="3rd">3rd Year</SelectItem>
										<SelectItem value="4th">4th Year</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" disabled={disabled} className="mt-0">
					Submit
				</Button>
			</form>
		</Form>
	);
}

export default memo(AddCourses);
