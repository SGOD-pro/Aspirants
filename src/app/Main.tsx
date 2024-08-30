"use client"
import React from "react";
import { getCourseStore } from "@/global/CoursesStore";
import { toast } from "@/components/ui/use-toast";

function Main({ children }: Readonly<{ children: React.ReactNode }>) {
	const { allCourses } = getCourseStore();
	async function getAllCourses() {
		const reaponse = await allCourses();
		if (reaponse?.error) {
			toast({
				title: "Error",
				description: `${reaponse.error?.message}` || "Something went wrong",
				variant: "destructive",
			});
		}
	}
	React.useEffect(() => {}, []);

	return <main className="max-w-screen min-h-[100dvh]">{children}</main>;
}

export default Main;
