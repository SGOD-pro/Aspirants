"use client";
import React, { lazy, Suspense } from "react";
const LandingPage = lazy(() => import("@/components/home-components/Section1"));
const WhySection = lazy(
	() => import("@/components/home-components/Why-section")
);
const InstractorSection = lazy(
	() => import("@/components/home-components/InstractorSection")
);

const StarsBackground = lazy(() => import("@/components/ui/star-background"));
const ShootingStars = lazy(() => import("@/components/ui/sooting-star"));
import LazyLoad from "@/components/layout/LazyLoad";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";
const CarouselPlugin = lazy(
	() => import("@/app/admin/components/AdminCarousel")
);

function LayoutPage() {
	return (
		<main className="scrollbar overflow-hidden relative">
			<Suspense fallback={<div className="w-full h-full" />}>
				<div className="h-[100dvh] absolute top-0 left-0 -z-0 w-full bg-transparent">
					<StarsBackground />
					<ShootingStars />
				</div>
			</Suspense>
			<section className="relative h-[60dvh] xl:h-[90dvh] z-40 flex justify-between">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<LandingPage />
				</Suspense>
			</section>
			<LazyLoad fallback={<Skeleton className="w-full h-full" />}>
				<div className="w-full  relative  sm:p-8 mb-10 sm:mb-1 bg-slate-10 ">
					<Suspense fallback={<Skeleton className="w-full h-full" />}>
						<WhySection />
					</Suspense>
				</div>
			</LazyLoad>
			<LazyLoad fallback={<Skeleton className="" />}>
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<InstractorSection />
				</Suspense>
			</LazyLoad>
			{/* {topers && (
				<div className="w-full flex items-center flex-col">
					<h2 className="md:text-6xl text-3xl lg:text-7xl text-center font-bold  my-14 font-Noto_Sans">
						Aspirants <span className="text-theme highlight"> Elite{"'"}s</span>{" "}
					</h2>
					<Suspense fallback={<Skeleton className="w-full h-full" />}>
						<CarouselPlugin topers={topers} />
					</Suspense>
				</div>
			)} */}
			<div className="">
				<Footer />
			</div>
		</main>
	);
}

export default LayoutPage;
