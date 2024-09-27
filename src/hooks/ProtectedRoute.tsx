"use client";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/Auth"; // Assuming your Zustand store is in authStore.ts
import { notFound, useRouter } from "next/navigation";
import Loader from "@/components/layout/Loader";

interface ProtectedRouteProps {
	allowedRoles: ("admin" | "student" | "normal")[];
	fallback?: ReactNode;
	children: ReactNode;
}

const ProtectedRoute = ({
	allowedRoles,
	fallback = null,
	children,
}: ProtectedRouteProps) => {
	const { user, userPrefs, hydrated, verifySession } = useAuthStore(
		(state) => ({
			user: state.user,
			userPrefs: state.userPrefs,
			hydrated: state.hydrated,
			verifySession: state.verifySession,
		})
	);
	console.log(hydrated)
	const router = useRouter();

	// Run session verification if the app is just hydrated
	useEffect(() => {
		console.log("verify session");

		if (!hydrated) {
			console.log("verifysession executed");
			verifySession();
		}
	}, [hydrated, verifySession]);

	// Loading state while the session is being hydrated
	if (!hydrated) {
		return (
			<div className="flex justify-center items-center h-dvh">
				<Loader />
			</div>
		);
	}
	console.log(user);
	if (!user) {
		if (allowedRoles.includes("admin")) {
			console.log("trying admin login");
		}
		router.push("/login");
		return null;
	}

	const hasAccess =
		userPrefs &&
		allowedRoles.some((role) => userPrefs.role === role);

	if (!hasAccess) {
		console.log("no access");
		console.log(allowedRoles)
		return fallback || notFound();
	}

	return <>{children}</>;
};

export default ProtectedRoute;
