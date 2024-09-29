"use client";
import React, { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import getAnimationControlStore from "@/store/Animation";
import { courses } from "@/constants";

// Define the types for course items and course groups
type CourseItem = {
	header: string;
	boards?: Array<{
		name: string;
		subject: string;
	}>;
	subject?: string;
};

type CourseGroup = {
	type: string;
	data: CourseItem[];
};

type CoursesProps = {
	courses: CourseGroup[];
};

function Courses() {
	const { coursesAnimation, setCoursesAnimationCompleted } =
		getAnimationControlStore();

	const shouldAnimate =
		!coursesAnimation.time || new Date() > new Date(coursesAnimation.time);

	const fadeInVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className="scrollbar">
			<header className="h-[25dvh] md:h-[50dvh] flex items-end pb-10 md:pb-0 md:items-center justify-center">
				<div className="relative">
					<motion.h1
						initial={{
							opacity: shouldAnimate ? 0 : 1,
							y: shouldAnimate ? 50 : 0,
						}}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="font-extrabold text-6xl md:text-9xl tracking-tight text-white/10 selection:bg-transparent pointer-events-none selection:text-slate-700 mix-blend-difference"
						onAnimationComplete={setCoursesAnimationCompleted}
					>
						<strong>ASPIRANTS</strong>
					</motion.h1>
					<motion.p
						initial={{ opacity: shouldAnimate ? 0 : 1 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
						className="text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-widest text-white/60 text-lg md:text-4xl font-semibold"
					>
						Classes are{" "}
						<span className="text-theme font-semibold selection:text-black mix-blend-difference z-10">
							taught
						</span>{" "}
						here
					</motion.p>
				</div>
			</header>

			{courses.map((courseGroup, index) => (
				<CourseSection
					key={index}
					title={courseGroup.type}
					data={courseGroup.data}
					fadeInVariants={fadeInVariants}
				/>
			))}

			<Footer />
		</div>
	);
}

interface CourseSectionProps {
	title: string;
	data: CourseItem[];
	fadeInVariants: {
		hidden: { opacity: number; y: number };
		visible: { opacity: number; y: number };
	};
}

const CourseSection: React.FC<CourseSectionProps> = ({
	title,
	data,
	fadeInVariants,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true });

	return (
		<motion.section
			ref={ref}
			className="overflow-hidden m-auto md:w-[95%] my-5"
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={fadeInVariants}
			transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
		>
			<h3 className="text-3xl flex items-center gap-2 font-semibold mb-2 group cursor-default w-fit pl-3">
				{title}
				<ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-5" />
			</h3>
			<Carousel className="w-[90%] m-auto">
				<CarouselContent className="-ml-1">
					{data.map((item, index) => (
						<CarouselItem
							key={index}
							className="pl-1 md:basis-1/2 lg:basis-1/4"
						>
							<div className="p-1">
								<Card className="overflow-hidden">
									<CardContent className="aspect-square p-6 flex flex-col justify-between relative overflow-hidden">
										<div className="absolute w-[calc(100%+1rem)] h-full bg-zinc-100/80 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-[60%] " />
										<div className="relative h-full">
											<div className="h-[40%] grid place-content-center mix-blend-difference ">
												<div className="text-4xl mb-2 font-bold w-[90%] m-auto text-center ">
													<span className="capitalize">
														{title === "School" ? "Class:- " : ""}
													</span>
													{item.header}
												</div>
											</div>

											{title === "School" ? (
												item.boards?.map((board, boardIndex) => (
													<div className="mt-3" key={boardIndex}>
														<h5 className="text-lg font-bold">{board.name}</h5>
														<p>{board.subject}</p>
													</div>
												))
											) : (
												<div className="mt-5">
													<h5 className="text-lg font-bold">Subjects:- </h5>
													<p>{item.subject}</p>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</motion.section>
	);
};

export default memo(Courses);