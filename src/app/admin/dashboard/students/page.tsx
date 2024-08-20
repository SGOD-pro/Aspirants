"use client";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import React from "react";
import { coursesStore } from "@/global/CoursesStore";
import { getStudentStore } from "@/global/StudentsStore";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableHead,
	TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function Students() {
	const { courses } = coursesStore((state) => ({
		courses: state.courses,
	}));
	const { deleteStudent, students } = getStudentStore();
	const deleteFunction = async (id: string) => {
		const response = await deleteStudent(id);
		if (!response.success) {
			toast({
				title: "Error",
				description: `${response.error}` || "Something went wrong",
				variant: "destructive",
			});
		}
	};
	return (
		<>
			<Header>
				<div className="flex gap-3">
					<Input placeholder="Search by student id" />
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select a Course" />
						</SelectTrigger>
						<SelectContent>
							{courses ? (
								courses.map((course) => (
									<SelectItem key={course.uid} value={course.class}>
										{course.class}
									</SelectItem>
								))
							) : (
								<SelectItem value="null">No options avilable</SelectItem>
							)}
						</SelectContent>
					</Select>
				</div>
			</Header>

			<Container>
				<div className="border rounded-lg mt-3">
					<Table className="">
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Student Id</TableHead>

								<TableHead className="w-[100px]">Name</TableHead>

								<TableHead className="w-[100px]">Study in</TableHead>

								<TableHead className="w-[100px]">Subject</TableHead>

								<TableHead className="w-[100px]">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{students &&
								students.map((std) => (
									<TableRow key={std.uid}>
										<TableCell className="font-medium uppercase">
											{std.studentId}
										</TableCell>
										<TableCell className=" uppercase">{std.name}</TableCell>
										<TableCell className=" uppercase">{std.studyIn}</TableCell>
										<TableCell className="">{std.subject}</TableCell>
										<TableCell>
											<Button
												variant={"destructive"}
												size={"icon"}
												onClick={() => deleteFunction(std.uid!)}
											>
												<Trash2 />
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</div>
			</Container>
		</>
	);
}

export default Students;
