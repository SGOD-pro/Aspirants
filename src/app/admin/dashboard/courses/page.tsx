"use client";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Dialog from "@/components/Dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import AddCourses from "@/components/forms/courseForm";
import Addsubject from "@/components/forms/Addsubject";
import { coursesStore } from "@/global/CoursesStore";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableHead,
	TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";


function AdminCourses() {
	const { courses, popCourses } = coursesStore(state=>({
		courses: state.courses,
		popCourses: state.popCourses
	}));
	const deleteFunction = async (id: string) => {
		const response = await popCourses(id);
		if (!response.success) {
			toast({
				title: "Error",
				description: `${response.error}` || "Something went wrong",
				variant: "destructive",
			});
		}
	};
	return (
		<div className="">
			<Header>
				<h2 className="text-3xl font-bold">AllCourses</h2>
			</Header>
			<Container>
				<div className="py-3 flex gap-3">
					<Dialog title="Add Course" content={<AddCourses />}>
						<Button
							variant={"secondary"}
							className="flex gap-1 items-center font-bold"
						>
							Course <Plus />
						</Button>
					</Dialog>
					<Dialog title="Add subject" content={<Addsubject />}>
						<Button
							variant={"secondary"}
							className="flex gap-1 items-center font-bold"
						>
							Subject <Plus />
						</Button>
					</Dialog>
				</div>
				<div className="overflow-auto">
					<div className="border rounded-md max-h-[80vh] overflow-auto scrollbar">
						<Table className="">
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Subject</TableHead>

									<TableHead className="w-[100px]">Class</TableHead>

									<TableHead className="w-[100px]">Board</TableHead>

									<TableHead className="w-[100px]">Fees</TableHead>

									<TableHead className="w-[100px]">Action</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{courses&&courses.map((course) => (
									<TableRow key={course.uid}>
										<TableCell className="font-medium uppercase">
											{course.subject}
										</TableCell>
										<TableCell className=" uppercase">{course.class}</TableCell>
										<TableCell className=" uppercase">{course.board}</TableCell>
										<TableCell className="">
											{course.fees}
										</TableCell>
										<TableCell>
											<Button variant={"destructive"} size={"icon"} onClick={() => deleteFunction(course.uid!)}><Trash2 /></Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default AdminCourses;
