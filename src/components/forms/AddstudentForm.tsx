"use client";
import React, { memo, useState, lazy, Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { studentFormSchema } from "@/models/StudentSchema";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarDays, CirclePlus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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
import { format } from "date-fns";
import { getStudentStore } from "@/global/StudentsStore";
import { getCourseStore } from "@/global/CoursesStore";
import { toast } from "../ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Dialog from "@/components/Dialog";
const AddUniversity = lazy(() => import("@/components/forms/AddUniversity"));
import { universityStore } from "@/global/Universitys";
import { Skeleton } from "../ui/skeleton";

function AddstudentForm({
	defaultValue,
	id,
}: {
	defaultValue?: z.infer<typeof studentFormSchema>;
	id?: string;
}) {
	const [disabled, setDisabled] = useState(false);
	const form = useForm<z.infer<typeof studentFormSchema>>({
		resolver: zodResolver(studentFormSchema),
		defaultValues: defaultValue || {},
	});
	const { addStudent, updateStudent } = getStudentStore();
	const { subjects } = getCourseStore();
	const { universities } = universityStore((state) => ({
		universities: state.universities,
	}));

	const onSubmit = React.useCallback(
		async (values: z.infer<typeof studentFormSchema>) => {
			console.log(values);
			console.log("id is",id);
			let response;
			setDisabled(true);
			if (defaultValue && id) {
				response = await updateStudent(id, values);
			} else response = await addStudent(values);
			setDisabled(false);
			if (response.success) {
				form.reset();
				toast({
					title: defaultValue && id?"Student updated!":"Student added!",
				});
			} else {
				toast({
					title: "Error",
					description: `${response.error}` || "Something went wrong",
					variant: "destructive",
				});
			}
		},
		[]
	);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-2 sm:gap-3 items-end mt-3"
			>
				{/* StudentId */}
				<FormField
					control={form.control}
					name="studentId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>StudentId</FormLabel>
							<FormControl>
								<Input
									placeholder="ASP-24/25-1"
									{...field}
									disabled={disabled}
								/>
							</FormControl>
							<FormMessage className="text-rose-500" />
						</FormItem>
					)}
				/>
				{/* Admission Date */}
				<FormField
					control={form.control}
					name="admissionDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Admission Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarDays className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} disabled={disabled} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="xyz@example.com"
									{...field}
									disabled={disabled}
								/>
							</FormControl>
							<FormMessage className="text-rose-500" />
						</FormItem>
					)}
				/>
				{/* Phone No */}
				<FormField
					control={form.control}
					name="phoneNo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone No</FormLabel>
							<FormControl>
								<Input
									placeholder="xxxxxxxxxx"
									{...field}
									disabled={disabled}
								/>
							</FormControl>
							<FormMessage className="text-rose-500" />
						</FormItem>
					)}
				/>
				{/* School/Collage */}
				<FormField
					control={form.control}
					name="studyAt"
					render={({ field }) => (
						<FormItem>
							<FormLabel>School/Collage</FormLabel>
							<FormControl>
								<RadioGroup
									className="flex gap-3 mt-2 items-center justify-around"
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormItem className="flex items-center space-x-2">
										<FormControl>
											<RadioGroupItem value="school" id="school" />
										</FormControl>
										<FormLabel className="font-normal" htmlFor="school">
											School
										</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-2">
										<FormControl>
											<RadioGroupItem value="collage" id="collage" />
										</FormControl>
										<FormLabel className="font-normal" htmlFor="collage">
											Collage
										</FormLabel>
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
								<Dialog
									title="Add university"
									content={
										<Suspense fallback={<Skeleton className="h-56" />}>
											<AddUniversity />
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
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Institution Name */}
				<FormField
					control={form.control}
					name="institutionName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Institution Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Instution Name"
									{...field}
									disabled={disabled}
								/>
							</FormControl>
							<FormMessage className="text-rose-500" />
						</FormItem>
					)}
				/>

				{/* Courses/Subjects */}
				<FormField
					control={form.control}
					name="subjects"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="">Courses/Subjects</FormLabel>
							<DropdownMenu modal={false}>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="border-dashed w-full">
										Courses
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>Courses</DropdownMenuLabel>
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
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Payment Fee */}
				<FormField
					control={form.control}
					name="payment"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payment Fee</FormLabel>
							<FormControl>
								<Input placeholder="0" {...field} disabled={disabled} />
							</FormControl>
							<FormMessage className="text-rose-500" />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={disabled}>
					Submit
				</Button>
				<FormDescription className="col-start-1 col-end-3 text-center">
					For more detials contact to instructor
				</FormDescription>
			</form>
		</Form>
	);
}

export default memo(AddstudentForm);
