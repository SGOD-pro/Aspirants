"use client"
import AdminNavbar from "@/app/admin/components/AdminNavbar";
import {getAuthState} from "@/global/AdminAuth"
import { notFound } from "next/navigation";
import { coursesStore, getCourseStore } from "@/global/CoursesStore"; // Use the hook
import { useUniversityStore, universityStore } from "@/global/Universitys"; // Use the hook
import React from "react";
import { toast } from "@/components/ui/use-toast";
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth=getAuthState();
	if (!auth.userPrefs?.isAdmin||!auth.userPrefs?.isVerified) {
		notFound();
	}
	const { allSubjects } = getCourseStore();
	const { setUniversities } = useUniversityStore();
	const { subjects } = coursesStore((state) => ({
		subjects: state.subjects,
	}));
	const { universities } = universityStore((state) => ({
		universities: state.universities,
	}));

	async function fetchAllSubjects() {
		const response = await Promise.all([allSubjects(), setUniversities()]);
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

	React.useEffect(() => {
		if (!subjects || !universities) {
			fetchAllSubjects();
		}
	}, []);
	return (
		<main className="grid grid-cols-[1fr,4fr] w-screen max-h-[100dvh] overflow-hidden">
			<AdminNavbar />
			<div className="border-l p-2 pt-0 max-h-[100dvh]  overflow-auto overflow-x-hidden scrollbar">{children}</div>
		</main>
	);
}
