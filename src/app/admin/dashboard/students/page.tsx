"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import { coursesStore } from "@/global/CoursesStore";
import { getStudentStore, StudentWithId } from "@/global/StudentsStore";
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

const MemoizedTableRow = React.memo(
	({
		student,
		onDelete,
	}: {
		student: StudentWithId;
		onDelete: (id: string) => void;
	}) => (
		<TableRow key={student.uid}>
			<TableCell className="font-medium uppercase">
				{student.studentId}
			</TableCell>
			<TableCell className="uppercase">{student.name}</TableCell>
			<TableCell className="uppercase">{student.university}</TableCell>
			<TableCell>{student.subjects.join(", ")}</TableCell>
			<TableCell>
				<Button
					variant={"destructive"}
					size={"icon"}
					onClick={() => onDelete(student.uid!)}
				>
					<Trash2 />
				</Button>
			</TableCell>
		</TableRow>
	)
);
MemoizedTableRow.displayName = "MemoizedTableRow";
function Students() {
	const { courses } = coursesStore((state) => ({
		courses: state.courses,
	}));

	const { students, deleteStudent, setAllStudents } = getStudentStore();
	async function fetchAllStudents() {
		const response = await setAllStudents();
    if (!response.success) {
      toast({
        title: "Error",
        description: response.error?.message || "Something went wrong",
        variant: "destructive",
      });
    }
	}
	useEffect(() => {
		fetchAllStudents();
	}, []);

	const deleteFunction = useCallback(async (id: string) => {
		const response = await deleteStudent(id);
		if (!response.success) {
			toast({
				title: "Error",
				description: response.error?.message || "Something went wrong",
				variant: "destructive",
			});
		}
	}, []);

	const renderedStudents = useMemo(
		() =>
			students?.map((student) => (
				<MemoizedTableRow
					key={student.uid}
					student={student}
					onDelete={deleteFunction}
				/>
			)),
		[students, deleteFunction]
	);

	return (
		<>
			<Header>
				<div className="space-y-4">
					<Input placeholder="Search by student ID" />
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select a Course" />
						</SelectTrigger>
						<SelectContent>
							{courses ? (
								courses.map((course) => (
									<SelectItem key={course.uid} value={course.department}>
										{course.department}
									</SelectItem>
								))
							) : (
								<SelectItem value="null">No options available</SelectItem>
							)}
						</SelectContent>
					</Select>
				</div>
			</Header>

			<Container>
				<div className="border rounded-lg mt-3">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Student ID</TableHead>
								<TableHead className="w-[100px]">Name</TableHead>
								<TableHead className="w-[100px]">Study in</TableHead>
								<TableHead className="w-[100px]">Subject</TableHead>
								<TableHead className="w-[100px]">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>{renderedStudents}</TableBody>
					</Table>
				</div>
			</Container>
		</>
	);
}
