import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import React, { lazy, Suspense } from "react";
import { AddStudentButton } from "../page";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
const StudentTable = lazy(() => import("../../components/AllStudents"));
function AllStudetnsPage() {
	return (
		<>
			<Header>

			<AddStudentButton>
					<Button
						variant="default"
						className="flex font-semibold gap-2 text-primary bg-blue-500 hover:bg-blue-600"
					>
						<UserRoundPlus />
						<span>Add Student</span>
					</Button>
				</AddStudentButton>
			</Header>
			<Container>
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<StudentTable />
				</Suspense>
			</Container>
		</>
	);
}

export default AllStudetnsPage;
