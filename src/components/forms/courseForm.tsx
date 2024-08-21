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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getCourseStore } from "@/global/CoursesStore";
import { toast } from "../ui/use-toast";
const board: string[] = [
	"bca",
	"bba",
	"msc",
	"bsc",
	"wbbse",
	"wbchse",
	"iccse",
	"cbse",
];

function AddCourses() {
	const { pushCourses, subjects } = getCourseStore();

	const [disabled, setDisabled] = useState(false);
	const form = useForm<z.infer<typeof coursesSchema>>({
		resolver: zodResolver(coursesSchema),
	});

	const submit = useCallback(
		async (values: z.infer<typeof coursesSchema>) => {
			console.log(values);
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

	const [studySelection, setStudySelection] = useState<
		"school" | "college" | null
	>(null);

	const schoolBoards = board.slice(-4);
	const collegeBoards = board.slice(0, -4);

	const handleStudyChange = (value: string) => {
		setStudySelection(value as "school" | "college");
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)} className="space-y-5 mt-3">
			<FormField
					control={form.control}
					name="college"
					render={({ field }) => (
						<FormItem>
							<FormLabel>School/Collage</FormLabel>
							<FormControl>
								<RadioGroup
									className="flex gap-3 mt-2"
									onValueChange={(value) => {
										handleStudyChange(value), field.onChange(value);
									}}
								>
									<FormItem className="flex items-center space-x-2">
										<FormControl>
										<RadioGroupItem value="school" id="school" />
										</FormControl>
										<FormLabel className="font-normal">
										School
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-2">
										<FormControl>
										<RadioGroupItem value="collage" id="collage" />
										</FormControl>
										<FormLabel className="font-normal">
										Collage
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="columns-2">
					<FormField
						control={form.control}
						name="board"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Board/UG Degree</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									disabled={studySelection === null}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a verified email to display" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className=" uppercase">
										{(studySelection === "school"
											? schoolBoards
											: collegeBoards
										).map((item) => (
											<SelectItem key={item} className="uppercase" value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage className="text-rose-500" />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="subject"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subjects</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									disabled={studySelection === null}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a subject" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{subjects ? (
											subjects.map((item) => (
												<SelectItem key={item.uid} value={item.name}>
													{item.name}
												</SelectItem>
											))
										) : (
											<SelectItem value="null">Nothing</SelectItem>
										)}
									</SelectContent>
								</Select>

								<FormMessage className="text-rose-500" />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="class"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{studySelection === "school"?"Class":"Branch"}</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage className="text-rose-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="fees"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fees</FormLabel>
							<FormControl>
								<Input placeholder="0" {...field} />
							</FormControl>
							<FormMessage className="text-rose-500" />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={disabled}>
					Submit
				</Button>
			</form>
		</Form>
	);
}

export default memo(AddCourses);
