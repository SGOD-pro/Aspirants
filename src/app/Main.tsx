"use client";
import React from "react";
import { getCourseStore } from "@/store/CoursesStore";
import { useAuthStore } from "@/store/Auth";
import { toast } from "@/components/ui/use-toast";
import { useRouteStore } from "@/store/HistoryRoutes";
import { useRouteHistory } from "@/hooks/RoutesHistory";

function Main({ children }: Readonly<{ children: React.ReactNode }>) {
	const { allCourses } = getCourseStore();
	const { resetHistory } = useRouteStore();
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
	useRouteHistory();
	React.useEffect(() => {
		if (!hydrated) {
			console.log("from main");
			resetHistory();
			verifySession();
		}
	}, [hydrated, verifySession]);

	return <main className="max-w-screen min-h-[100dvh]">{children}</main>;
}

export default Main;
