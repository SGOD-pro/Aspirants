"use client";
import React, { memo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { getStudentStore } from "@/global/StudentsStore";
import { getCourseStore } from "@/global/CoursesStore";
import { toast } from "../ui/use-toast";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
function AddstudentForm({
	defaultValue,
}: {
	defaultValue?: z.infer<typeof studentFormSchema>;
}) {
	const [disabled, setDisabled] = useState(false);
	const form = useForm<z.infer<typeof studentFormSchema>>({
		resolver: zodResolver(studentFormSchema),
	});
	const { addStudent } = getStudentStore();
	const { subjects } = getCourseStore();
	const [studySelection, setStudySelection] = useState<
		"school" | "college" | null
	>(null);

	//TODO:Fetch courses record
	// const schoolBoards = board.slice(-4);
	// const collegeBoards = board.slice(0, -4);

	const handleStudyChange = (value: string) => {
		setStudySelection(value as "school" | "college");
	};
	const onSubmit = React.useCallback(
		async (values: z.infer<typeof studentFormSchema>) => {
			console.log(values);
			setDisabled(true);
			const response = await addStudent(values);
			setDisabled(false);
			if (response.success) {
				toast({
					title: "Student added!",
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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-2 sm:gap-3 items-end"
			>
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
				<FormField
					control={form.control}
					name="college"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<FormLabel>School/Collage</FormLabel>
								<RadioGroup
									className="flex gap-3 mt-2"
									onValueChange={(value) => {
										handleStudyChange(value), field.onChange(value);
									}}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="school" id="school" />
										<Label htmlFor="school">School</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="collage" id="collage" />
										<Label htmlFor="collage">Collage</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="studyIn"
					render={({ field }) => (
						<FormItem>
							<FormLabel>StudyIn</FormLabel>
							<FormControl>
								<Input
									placeholder="Class/Branch"
									{...field}
									disabled={disabled}
								/>
							</FormControl>
							<FormMessage className="text-rose-500" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="institutionName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Institution Name</FormLabel>
							<FormControl>
								<Input
									placeholder="School/College Name"
									{...field}
									disabled={disabled}
								/>
							</FormControl>
							<FormMessage className="text-rose-500" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
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
							<FormMessage />
						</FormItem>
					)}
				/>
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
			</form>
		</Form>
	);
}

export default memo(AddstudentForm);
