"use client";
import React, { useEffect, lazy, Suspense } from "react";
import { coursesStore, getCourseStore } from "@/global/CoursesStore"; // Use the hook
import { getStudentStore, studentStore } from "@/global/StudentsStore"; // Use the hook
import { getEventStore } from "@/global/Event"; // Use the hook
import getTopersStore from "@/global/Topers"; // Use the hook
import { Button } from "@/components/ui/button";
import { UserRoundPlus, CalendarPlus, Plus, Fullscreen } from "lucide-react";
import Dialog from "@/components/Dialog";
const CarouselPlugin = lazy(
	() => import("@/app/admin/components/AdminCarousel")
);
const AddTopers = lazy(() => import("@/components/forms/AddTopers"));
const AllCourses = lazy(() => import("@/app/admin/components/AllCourses"));
const TotalStudent = lazy(() => import("@/app/admin/components/TotalStudent"));
const ShowEvent = lazy(() => import("@/app/admin/components/ShowEvent"));
const ShowTopers = lazy(() => import("@/app/admin/components/ShowTopers"));
const RecentStudnets = lazy(
	() => import("@/app/admin/components/RecentStudnets")
);
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import AddEventForm from "@/components/forms/AddEventForm";
import AddstudentForm from "@/components/forms/AddstudentForm";

function AdminDashboard() {
	const { allSubjects, allCourses } = getCourseStore();
	const { setAllStudents } = getStudentStore();
	const { getEvents } = getEventStore();
	const { fetchTopers } = getTopersStore();
	const { subjects } = coursesStore((state) => ({
		subjects: state.subjects,
	}));
	const { students } = studentStore((state) => ({
		students: state.students,
	}));
	async function fetchAllSubjects() {
		const response = await Promise.all([
			allSubjects(),
			allCourses(),
			setAllStudents(),
			getEvents(),
			fetchTopers(),
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
		if (!subjects || !students) {
			fetchAllSubjects();
		}
	}, []);

	return (
		<div>
			<Header>
				<aside className="flex gap-3">
					<Dialog content={<AddstudentForm />} title="New Student">
						<Button
							variant="default"
							className="flex font-semibold gap-2 text-primary bg-blue-500 hover:bg-blue-600"
						>
							<UserRoundPlus />
							<span>Add Student</span>
						</Button>
					</Dialog>
					<Dialog content={<AddEventForm />} title="Add Event">
						<Button variant={"ghost"} className="flex gap-2 items-center">
							<span>Event</span>
							<CalendarPlus />
						</Button>
					</Dialog>
					<Dialog title="Our Topers" content={<AddTopers />}>
						<Button variant={"ghost"} className="flex gap-2 items-center">
							<span>Achivers</span>
							<Plus />
						</Button>
					</Dialog>
				</aside>
			</Header>
			<Container>
				<section className="md:h-72 lg:p-6 lg:pb-4">
					<div className="rounded-2xl w-full h-full md:bg-slate-800 shadow-md shadow-black grid md:grid-cols-3 md:items-center p-2 lg:p-4 gap-4 md:gap-0">
						<Suspense fallback={<Skeleton className="w-full h-full" />}>
							<TotalStudent />
							<RecentStudnets />
							<AllCourses />
						</Suspense>
					</div>
				</section>

				<section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] overflow-auto items-center gap-2">
					<div className="relative">
						<div className="justify-end flex gap-3 lg:absolute right-2 mt-2 lg:mt-0">
							<Dialog title="Our Topers" content={<ShowTopers />}>
								<Button
									variant={"outline"}
									className="flex gap-2 items-center"
									size={"icon"}
								>
									<Fullscreen />
								</Button>
							</Dialog>
						</div>
						<div className="flex justify-center w-[80%] m-auto">
							<Suspense fallback={<Skeleton className="w-full h-full" />}>
								<CarouselPlugin />
							</Suspense>
						</div>
					</div>
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

export default AdminDashboard;
