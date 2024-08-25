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
import { StarsBackground } from "@/components/ui/star-background";
import { ShootingStars } from "@/components/ui/sooting-star";
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
			<div className="h-[100dvh] absolute top-0 left-0 -z-0 w-full bg-transparent">
				<StarsBackground />
				<ShootingStars />
			</div>
			<section className="relative h-[50dvh] lg:h-[90dvh] z-40 flex justify-between">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<LandingPage />
				</Suspense>
			</section>
			<section className="w-full relative  sm:p-8 mb-10 sm:mb-1">
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
