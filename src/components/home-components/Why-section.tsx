import React from "react";

import LampContainer from "@/components/ui/lamp";
import StickyScroll from "@/components/ui/sticky-scroll";
import Image from "next/image";

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
			<div className="hidden sm:block relative z-10">
				<LampContainer>
					<h2 className="text-4xl sm:text-6xl text-center font-semibold">
						Why <br /> <strong> Aspirants Classes?</strong>
					</h2>
				</LampContainer>
			</div>
			<div className="block sm:hidden relative z-10 border-t-2 border-t-cyan-500 mb-5 pt-8">
				<div className="absolute glow top-0"></div>
					<h2 className="text-4xl sm:text-6xl text-center font-semibold">
						Why <br /> <strong> Aspirants Classes?</strong>
					</h2>
			</div>
			<div className="m-auto w-full md:w-[80dvw] sm:h-[24rem] relative z-20 sm:-translate-y-1/2">
				<StickyScroll content={content} />
			</div>
		</>
	);
}

export default WhySection;
