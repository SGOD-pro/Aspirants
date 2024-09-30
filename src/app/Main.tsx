"use client";
import React from "react";
import { getCourseStore } from "@/store/CoursesStore";
import { useAuthStore } from "@/store/Auth";
import { toast } from "@/components/ui/use-toast";
import { useRouteStore } from "@/store/HistoryRoutes";
import { useRouteHistory } from "@/hooks/RoutesHistory";
import Curtain from "@/components/Curtain";
import { usePathname } from "next/navigation";
import { animationControl } from "@/store/Animation";
import Loader from "@/components/layout/Loader";

function Main({ children }: Readonly<{ children: React.ReactNode }>) {
	const { allCourses } = getCourseStore();
	const { resetHistory } = useRouteStore();
	const { curtainAnimation } = animationControl((state) => ({
		curtainAnimation: state.curtainAnimation,
	}));
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
	const [showCurtain, setShowCurtain] = React.useState(true);
	React.useEffect(() => {
		if (
			pathName !== "/" ||
			(curtainAnimation.time && curtainAnimation.time > new Date())
		) {
			setShowCurtain(false);
		}
	}, [curtainAnimation]);

	const pathName = usePathname();

	return (
		<>
			{showCurtain && <Curtain />}
			{!hydrated && (
				<div className="fixed w-screen h-dvh bg-slate-950 z-[100] top-0 left-0 flex items-center justify-center">
					<Loader />
				</div>
			)}
			<main className="max-w-screen min-h-[100dvh]">{children}</main>
		</>
	);
}

export default Main;
