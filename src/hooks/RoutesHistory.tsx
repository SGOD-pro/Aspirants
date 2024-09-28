"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import `usePathname` to track route changes
import { useRouteStore } from "@/store/HistoryRoutes";

export const useRouteHistory = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { history, addRoute, resetHistory, removeLastRoute } = useRouteStore(
		(state) => ({
			history: state.history,
			addRoute: state.addRoute,
			resetHistory: state.resetHistory,
			removeLastRoute: state.removeLastRoute,
		})
	);

	useEffect(() => {
		if (pathname) {
			console.log(pathname);
			addRoute(pathname);
			console.log(history);
		}
	}, [pathname, addRoute]);

	// Function to navigate back
	const goBack = () => {
		console.log("back");
		console.log(history);
		if (history.length > 1) {
			const prevRoute = history[history.length - 2];
			router.push(prevRoute);
			removeLastRoute();
		} else {
			router.push("/");
		}
	};

	return { history, goBack, resetHistory };
};
