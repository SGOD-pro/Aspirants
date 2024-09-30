import Link from "next/link";
import React, { lazy, Suspense } from "react";
import { HoverBorderGradient } from "@/components/ui/border-gradient";
import { Skeleton } from "../ui/skeleton";
const EasterEgg = lazy(() => import("../ui/EsterEgg"));

function Section1() {
	return (
		<>
			<aside className="flex flex-col h-full p-10 sm:p-16 pt-8 sm:pt-36 justify-center gap-4 sm:w-1/2 sm:min-w-96 text-center sm:text-left">
				<p className="text-2xl sm:text-4xl">Welcome to,</p>
				<h1 className="text-5xl sm:text-8xl font-bold">
					Aspirants <span>Classes</span>
				</h1>
				<p className="text-sm sm:text-base text-slate-500 w-full sm:w-96 ">
					{" "}
					Your premier destination for personalized educational support and
					professional guidance.{" "}
				</p>
				<div className="flex justify-center sm:justify-end sm:w-[70%] mt-3 sm:mt-6">
					<HoverBorderGradient>
						<Link
							href={"/courses"}
							className="md:text-2xl text-whitetransition-all"
						>
							Courses
						</Link>
					</HoverBorderGradient>
				</div>
			</aside>
			<div className="pr-0 xl:pr-8 hidden lg:block absolute right-10 xl:right-20 top-10 z-[100]">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<EasterEgg />
				</Suspense>
			</div>
		</>
	);
}

export default Section1;
