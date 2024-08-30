"use client";
import React, { lazy, Suspense, memo } from "react";
import { Button } from "@/components/ui/button";
import { UserRoundPlus, CalendarPlus, Plus } from "lucide-react";
import Dialog from "@/components/Dialog";
const AddstudentForm = lazy(() => import("@/components/forms/AddstudentForm"));
const TotalStudent = lazy(() => import("@/app/admin/components/TotalStudent"));
const AllCourses = lazy(() => import("@/app/admin/components/AllCourses"));
const AddTopers = lazy(() => import("@/components/forms/AddTopers"));
const ShowEvent = lazy(() => import("@/app/admin/components/ShowEvent"));
const RecentStudnets = lazy(
	() => import("@/app/admin/components/RecentStudnets")
);
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";
import AddEventForm from "@/components/forms/AddEventForm";
const ToperSection = lazy(() => import("../components/ToperSection"));
import { StudentWithId } from "@/global/StudentsStore";
export const AddStudentButton = memo(
	({
		data,
		children,
	}: {
		data?: StudentWithId;
		children: React.ReactNode;
	}): React.ReactNode => {
		console.log(data)
		return (
			<Dialog
				content={
					<Suspense fallback={<Skeleton className="w-full h-96" />}>
						<AddstudentForm defaultValue={data} />
					</Suspense>
				}
				title="New Student"
			>
				{children}
			</Dialog>
		);
	}
);
AddStudentButton.displayName = "AddStudentButton";
function AdminDashboard() {
	return (
		<div>
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
				<Dialog
					content={
						<Suspense fallback={<Skeleton className="w-full h-96" />}>
							<AddstudentForm />
						</Suspense>
					}
					title="New Student"
				>
					<Button
						variant="default"
						className="flex font-semibold gap-2 text-primary bg-blue-500 hover:bg-blue-600"
					>
						<UserRoundPlus />
						<span>Add Student</span>
					</Button>
				</Dialog>
				<Dialog content={<AddEventForm />} title="Add Event">
					<Button variant={"outline"} className="flex gap-2 items-center">
						<span>Event</span>
						<CalendarPlus />
					</Button>
				</Dialog>
				<Dialog title="Our Topers" content={<AddTopers />}>
					<Button variant={"outline"} className="flex gap-2 items-center">
						<span>Achivers</span>
						<Plus />
					</Button>
				</Dialog>
			</Header>
			<Container>
				<section className="md:h-72 lg:p-6 lg:pb-4">
					<div className="rounded-2xl w-full h-full md:bg-slate-800 shadow-md shadow-black grid md:grid-cols-3 md:items-center p-2 lg:p-4 gap-4 md:gap-0">
						<Suspense fallback={<Skeleton className="w-full h-full" />}>
							<TotalStudent />
						</Suspense>
						<Suspense fallback={<Skeleton className="w-full h-full" />}>
							<RecentStudnets />
						</Suspense>
						<Suspense fallback={<Skeleton className="w-full h-full" />}>
							<AllCourses />
						</Suspense>
					</div>
				</section>

				<section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] overflow-auto items-center gap-2">
					<Suspense fallback={<Skeleton className="w-full h-full" />}>
						<ToperSection />
					</Suspense>
					<div className="lg:text-base text-xs h-full overflow-hidden border-l px-3">
						<h3 className="font-bold text-2xl mb-3 px-3">Events</h3>
						<Suspense fallback={<Skeleton className="w-full h-full" />}>
							<ShowEvent />
						</Suspense>
					</div>
				</section>
			</Container>
		</div>
	);
}

export default memo(AdminDashboard);
