import Link from "next/link";
import React from "react";
import { StarsBackground } from "@/components/ui/star-background";
import { ShootingStars } from "@/components/ui/sooting-star";
import { HoverBorderGradient } from "@/components/ui/border-gradient";
function Section1() {
	return (
		<>
			<div className=" h-[100dvh] absolute top-0 left-0 -z-20 w-full bg-transparent">
				<StarsBackground />
				<ShootingStars />
			</div>
			<aside className="flex flex-col h-full p-10 sm:p-16 pt-8 sm:pt-36 justify-center gap-4 w-1/2 min-w-96 ">
				<p className="text-2xl sm:text-4xl">Welcome to,</p>
				<h1 className="text-5xl sm:text-8xl font-semibold">
					Aspirants <strong>Classes</strong>
				</h1>
				<p className="text-sm sm:text-base opacity-50 w-full sm:w-96 ">
					{" "}
					Your premier destination for personalized educational support and
					professional guidance.{" "}
				</p>
				<div className="flex sm:justify-end w-[70%] mt-3 sm:mt-6">
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
		</>
	);
}

export default Section1;
