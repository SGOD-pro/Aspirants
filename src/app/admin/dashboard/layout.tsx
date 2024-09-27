"use client";
import AdminNavbar from "@/app/admin/components/AdminNavbar";
import { coursesStore, getCourseStore } from "@/store/CoursesStore";
import { useUniversityStore, universityStore } from "@/store/Universitys";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import ProtectedRoute from "@/hooks/ProtectedRoute";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
		<ProtectedRoute allowedRoles={["admin"]}>
			<main className="grid grid-cols-[1fr,4fr] w-screen max-h-[100dvh] overflow-hidden">
				<AdminNavbar />
				<div className="border-l p-2 pt-0 max-h-[100dvh]  overflow-auto overflow-x-hidden scrollbar">
					{children}
				</div>
			</main>
		</ProtectedRoute>
	);
}
