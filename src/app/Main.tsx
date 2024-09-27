"use client"
import React from "react";
import { getCourseStore } from "@/store/CoursesStore";
import { useAuthStore } from "@/store/Auth";
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
	const verifySession = useAuthStore((state) => state.verifySession);
	const hydrated = useAuthStore((state) => state.hydrated);
  
	React.useEffect(() => {
	  if (!hydrated) {
		console.log("from main")
		verifySession();
	  }
	}, [hydrated, verifySession]);

	return <main className="max-w-screen min-h-[100dvh]">{children}</main>;
}

export default Main;
