"use client";
import React, { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/global/AdminAuth";
const LandingPage = lazy(() => import("@/components/home-components/Section1"));
const WhySection = lazy(
	() => import("@/components/home-components/Why-section")
);
const InstractorSection = lazy(
	() => import("@/components/home-components/InstractorSection")
);
const Footer = lazy(() => import("@/components/layout/Footer"));

export default function Home() {
	const { verifySession } = useAuthStore();
	React.useEffect(() => {
		verifySession();
		return () => {
			verifySession();
		};
	}, []);

	return (
		<main className="scrollbar">
			<section className="relative h-[70dvh] lg:h-[95dvh] z-0">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<LandingPage />
				</Suspense>
			</section>
			<section className="w-full relative z-10 sm:p-8 mb-10 sm:mb-1">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<WhySection />
				</Suspense>
			</section>
			<section className="">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<InstractorSection />
				</Suspense>
			</section>
			<Suspense fallback={<Skeleton className="w-full h-full" />}>
				<Footer />
			</Suspense>
		</main>
	);
}
