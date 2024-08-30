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
const StarsBackground = lazy(() => import("@/components/ui/star-background"));
const ShootingStars = lazy(() => import("@/components/ui/sooting-star"));
import LazyLoad from "@/components/layout/LazyLoad";

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
			<Suspense fallback={<div className="w-full h-full" />}>
				<div className="h-[100dvh] absolute top-0 left-0 -z-0 w-full bg-transparent">
					<StarsBackground />
					<ShootingStars />
				</div>
			</Suspense>
			<section className="relative h-[50dvh] lg:h-[90dvh] z-40 flex justify-between lg:max-h-[800px]">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<LandingPage />
				</Suspense>
			</section>
			<LazyLoad fallback={<Skeleton className="w-full h-full" />}>
				<div className="w-full relative  sm:p-8 mb-10 sm:mb-1">
					<Suspense fallback={<Skeleton className="w-full h-full" />}>
						<WhySection />
					</Suspense>
				</div>
			</LazyLoad>
			<LazyLoad fallback={<Skeleton className="w-full h-full" />}>
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<InstractorSection />
				</Suspense>
			</LazyLoad>
			<LazyLoad fallback={<Skeleton className="w-full h-full" />}>
				<Footer />
			</LazyLoad>
		</main>
	);
}
