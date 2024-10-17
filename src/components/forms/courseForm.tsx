"use client";
import { coursesSchema, Course } from "@/schema/CourseSchema";
import { useForm } from "react-hook-form";
import React, { lazy, memo, Suspense, useCallback, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Dialog from "@/components/Dialog";
const Addsubject = lazy(() => import("@/components/forms/Addsubject"));
import { coursesStore } from "@/store/CoursesStore";
import { toast } from "../ui/use-toast";
import { CirclePlus } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
const types = ["school", "undergraduate", "competitive", "special"];
function AddCourses({
	defaultValue,
	id,
}: {
	defaultValue?: Course;
	id?: string;
}) {
	const { pushCourses, subjects, updateCourses } = coursesStore((state) => ({
		pushCourses: state.pushCourses,
		subjects: state.subjects,
		updateCourses: state.updateCourses,
	}));
	const [key, setKey] = useState(0)
	const [disabled, setDisabled] = useState(false);
	const form = useForm<z.infer<typeof coursesSchema>>({
		defaultValues: defaultValue || {fees:"0"},
		resolver: zodResolver(coursesSchema),
	});

	const submit = useCallback(
		async (values: z.infer<typeof coursesSchema>) => {
			console.log(values);
			let data = { ...values };
			if (values.type === "school") {
				data = {
					type: values.type,
					header: values.header,
					fees: values.fees,
					name: values.name,
					subjects: values.subjects,
				};
			}
			setDisabled(true);
			let response;
			if (defaultValue && id) {
				response = await updateCourses(id, data);
			} else {
				response = await pushCourses(data);
			}
			setDisabled(false);
			if (response.success) {
				toast({
					title: defaultValue && id ? "Course updated!" : "Course added!",
				});
				form.reset();
				setKey((prev) => prev + 1);
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
			<form onSubmit={form.handleSubmit(submit)} className="mt-3 space-y-4" key={key}>
				<FormField
					control={form.control}
					name="subjects"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="">
								Subjects <span className="text-red-500">*</span>
							</FormLabel>
							<div className="flex gap-3">
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className="border-dashed w-full">
											{form.watch("subjects")?.join(", ") || "Select Subjects"}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56">
										<DropdownMenuLabel>Subjects</DropdownMenuLabel>
										<DropdownMenuSeparator />
										{subjects &&
											subjects.map((item) => (
												<FormField
													key={item.uid}
													control={form.control}
													name="subjects"
													render={({ field }) => {
														const selectedSubjects = field.value || [];
														return (
															<DropdownMenuItem
																onSelect={(event) => event.preventDefault()}
															>
																<FormItem
																	key={item.uid}
																	className="flex flex-row items-start space-x-3 space-y-0"
																>
																	<FormControl className="space-y-4">
																		<Checkbox
																			checked={selectedSubjects.includes(
																				item.name
																			)}
																			onCheckedChange={(checked) => {
																				const updatedSubjects = checked
																					? [...selectedSubjects, item.name]
																					: selectedSubjects.filter(
																							(value) => value !== item.name
																					  );
																				field.onChange(updatedSubjects);
																			}}
																		/>
																	</FormControl>
																	<FormLabel className="font-normal">
																		{item.name}
																	</FormLabel>
																</FormItem>
															</DropdownMenuItem>
														);
													}}
												/>
											))}
									</DropdownMenuContent>
								</DropdownMenu>
								<Dialog
									title="Add subject"
									content={
										<Suspense fallback={<Skeleton className="h-56" />}>
											<Addsubject />
										</Suspense>
									}
								>
									<Button
										type="button"
										disabled={disabled}
										size={"icon"}
										variant={"outline"}
									>
										<CirclePlus className="w-4 h-4" />
									</Button>
								</Dialog>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-2 gap-3">
					{/* Type*/}
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Type<span className="text-red-500">*</span>
								</FormLabel>
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
											{types.map((type) => (
												<SelectItem
													key={type}
													value={type}
													className="capitalize"
												>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Course fees */}
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
										defaultValue={field.value}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{/* header */}
					<FormField
						control={form.control}
						name="header"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Header<span className="text-red-500">*</span>
								</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="BCA/BSC/12/11/Linear Algebra"
										onChange={field.onChange}
										defaultValue={field.value}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					{/* name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Name{" "}
									<span className="text-red-500 text-xs">
										{" "}
										{"("}If School{")"}
									</span>
								</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="ICSE/CBSE"
										onChange={field.onChange}
										defaultValue={field.value}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="mt-0"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}

export default memo(AddCourses);
