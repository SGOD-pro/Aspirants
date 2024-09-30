import React, { lazy, Suspense } from "react";

import LampContainer from "@/components/ui/lamp";
const StickyScroll = lazy(() => import("@/components/ui/sticky-scroll"));
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

const content = [
	{
		title: "Comprehensive Curriculum",
		description:
			"Our curriculum is designed to offer a thorough and well-rounded educational experience. It covers all essential topics in detail, ensuring that students build a strong academic foundation. This approach not only prepares them for exams but also equips them with the knowledge and skills necessary for personal and professional growth.",
		content: (
			<div className="h-full w-full flex items-center justify-center text-white">
				<Image
					src="/img2.jpg"
					width={300}
					height={300}
					className="h-full w-full object-cover"
					alt="Comprehensive Curriculum"
				/>
			</div>
		),
	},
	{
		title: "Personalized Attention",
		description:
			"We are committed to providing personalized attention by maintaining small class sizes. This approach allows our educators to tailor their instruction to each student's needs, fostering a more supportive and effective learning environment. Every student receives the individual support they need to excel and reach their full potential.",
		content: (
			<div className="h-full w-full flex items-center justify-center text-white">
				<Image
					src="/img1.jpg"
					width={300}
					height={300}
					className="h-full w-full object-cover"
					alt="Personalized Attention"
				/>
			</div>
		),
	},
	{
		title: "Interactive Learning",
		description:
			"Our interactive learning methods and innovative teaching materials are designed to make education both engaging and enjoyable. We incorporate a variety of activities and technologies that cater to different learning styles, making lessons more dynamic and helping students stay motivated throughout their academic journey.",
		content: (
			<div className="h-full w-full flex items-center justify-center text-white">
				<Image
					src="/img3.jpg"
					width={300}
					height={300}
					className="h-full w-full object-cover"
					alt="Interactive Learning"
				/>
			</div>
		),
	},
	{
		title: "Flexible Scheduling",
		description:
			"We understand the diverse needs of our students and their families, which is why we offer a variety of class schedules and formats. Whether you prefer in-person or online classes, our flexible scheduling options are designed to accommodate different lifestyles and commitments, ensuring that education is accessible and convenient for everyone.",
		content: (
			<div className="h-full w-full flex items-center justify-center text-white">
				<Image
					src="/img4.jpg"
					width={300}
					height={300}
					className="h-full w-full object-cover"
					alt="Personalized Attention"
				/>
			</div>
		),
	},
];

function WhySection() {
	return (
		<>
			<div className="hidden sm:block absolute lg:relative top-0 left-0 -z-10 sm:-translate-y-[25%] md:-translate-y-[30%] lg:translate-y-0 w-screen">
				<LampContainer>
					<h2 className="text-4xl sm:text-6xl text-center font-semibold sm:-translate-y-[120%] lg:translate-y-0 ">
						Why <br /> <strong> Aspirants Classes?</strong>
					</h2>
				</LampContainer>
			</div>
			<div className="block sm:hidden relative z-10 mb-5 pt-8 w-full">
				<div className="absolute w-2/3 h-56 rounded-full bg-cyan-600/80 glow top-0 left-1/2 -translate-x-1/2 z-0 -translate-y-1/2 blur-[120px] opacity-80"></div>
				<h2 className="text-4xl sm:text-6xl text-center font-semibold z-10 relative mb-10">
					Why <br /> <strong> Aspirants Classes?</strong>
				</h2>
			</div>
			<div className="m-auto w-full md:w-[80dvw] relative sm:pt-56 lg:pt-0 z-10">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<StickyScroll content={content} />
				</Suspense>
			</div>
		</>
	);
}

export default WhySection;
