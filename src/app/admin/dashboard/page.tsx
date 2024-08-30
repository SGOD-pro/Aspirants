"use client";
import React, { useEffect, lazy, Suspense, memo } from "react";
import { coursesStore, getCourseStore } from "@/global/CoursesStore"; // Use the hook

import { useUniversityStore,universityStore } from "@/global/Universitys"; // Use the hook
import { Button } from "@/components/ui/button";
import { UserRoundPlus, CalendarPlus, Plus } from "lucide-react";
import Dialog from "@/components/Dialog";

const TotalStudent = lazy(() => import("@/app/admin/components/TotalStudent"));
const AllCourses = lazy(() => import("@/app/admin/components/AllCourses"));
const AddTopers = lazy(() => import("@/components/forms/AddTopers"));
const ShowEvent = lazy(() => import("@/app/admin/components/ShowEvent"));
const RecentStudnets = lazy(
	() => import("@/app/admin/components/RecentStudnets")
);
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import AddEventForm from "@/components/forms/AddEventForm";
const ToperSection = lazy(() => import("../components/ToperSection"));
const AddstudentForm = lazy(() => import("@/components/forms/AddstudentForm"));

function AdminDashboard() {
	const { allSubjects } = getCourseStore();
	const { setUniversities } = useUniversityStore();
	const { subjects } = coursesStore((state) => ({
		subjects: state.subjects,
	}));
	const { universities } = universityStore((state) => ({
		universities: state.universities,
	}));

	async function fetchAllSubjects() {
		const response = await Promise.all([
			allSubjects(),
			setUniversities(),
		]);
		response.forEach((element) => {
			if (element?.error) {
				toast({
					title: "Error",
					description: `${element.error?.message}` || "Something went wrong",
					variant: "destructive",
				});
			}
		});
	}

	useEffect(() => {
		if (!subjects||!universities) {
			fetchAllSubjects();
		}
	}, []);

	return (
		<div>
			<Header>
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
