import Link from "next/link";
import React, { lazy, Suspense } from "react";

import { HoverBorderGradient } from "@/components/ui/border-gradient";
import EasterEgg from "../ui/EsterEgg";
function Section1() {
	return (
		<>
			
			<aside className="flex flex-col h-full p-10 sm:p-16 pt-8 sm:pt-36 justify-center gap-4 sm:w-1/2 sm:min-w-96 text-center sm:text-left">
				<p className="text-2xl sm:text-4xl">Welcome to,</p>
				<h1 className="text-5xl sm:text-8xl font-semibold">
					Aspirants <strong>Classes</strong>
				</h1>
				<p className="text-sm sm:text-base opacity-50 w-full sm:w-96 ">
					{" "}
					Your premier destination for personalized educational support and
					professional guidance.{" "}
				</p>
				<div className="flex justify-center sm:justify-end sm:w-[70%] mt-3 sm:mt-6">
					<HoverBorderGradient>
						<Link
							href={"/courses"}
							className="md:text-2xl opacity-70 hover:opacity-100 transition-all"
						>
							Courses
						</Link>
					</HoverBorderGradient>
				</div>
			</aside>
			<div className="pr-8 hidden lg:block absolute right-20 top-10 z-[100]">
				
					<EasterEgg />
				
			</div>
		</>
	);
}

export default Section1;
