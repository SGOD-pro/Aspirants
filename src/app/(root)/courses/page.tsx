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
import ShinyButton from "@/components/ui/ShinyButton";
import Footer from "@/components/layout/Footer";

function Courses() {
	const ref1 = useRef(null);
	const ref2 = useRef(null);

	// Hooks to detect in-view state
	const isInView1 = useInView(ref1, { once: true });
	const isInView2 = useInView(ref2, { once: true });

	const fadeInVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className="scrollbar">
			
			<div className="h-[25dvh] md:h-[50dvh] flex items-end pb-10 md:pb-0 md:items-center justify-center">
				<div className="relative">
					<motion.h1
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="font-extrabold text-6xl md:text-9xl tracking-tight text-white/10 selection:bg-transparent pointer-events-none selection:text-slate-700 mix-blend-difference"
					>
						<strong>ASPIRANTS</strong>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
						className="text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-widest text-white/60 text-lg md:text-4xl font-semibold"
					>
						Classes are{" "}
						<span className="text-[#10dd55] font-semibold selection:text-black mix-blend-difference z-10">
							taught
						</span>{" "}
						here
					</motion.p>
				</div>
			</div>
			<motion.section
				ref={ref1}
				className="overflow-hidden m-auto w-[95vw] md:w-[95%] my-5"
				initial="hidden"
				animate={isInView1 ? "visible" : "hidden"}
				variants={fadeInVariants}
				transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
			>
				<h3 className="text-3xl flex items-center gap-2 font-semibold mb-2 group cursor-default w-fit pl-3">
					Batches
					<ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-5" />
				</h3>
				<Carousel className="w-full md:w-[90%] m-auto">
					<CarouselContent className="-ml-1">
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem
								key={index}
								className="pl-1 md:basis-1/2 lg:basis-1/4"
							>
								<div className="p-1">
									<Card>
										<CardContent className="aspect-square p-6 flex flex-col justify-between">
											<div className="">
												<h2 className="text-2xl mb-2 font-bold">
													Class:- <span className="">7-9</span>
												</h2>
												<h5 className="text-lg font-bold">Board:- </h5>
												<ul className="text-sm">
													<li>CBSE</li>
													<li>iccse</li>
													<li>wbbse</li>
												</ul>
											</div>
											<div className="text-right">
												<ShinyButton
													text="Details"
													className="font-bold rounded-xl"
												/>
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
			<motion.section
				ref={ref2}
				className="overflow-hidden m-auto md:w-[95%] my-5"
				initial="hidden"
				animate={isInView2 ? "visible" : "hidden"}
				variants={fadeInVariants}
				transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
			>
				<h3 className="text-3xl flex items-center gap-2 font-semibold mb-2 group cursor-default w-fit pl-3">
					Compitative
					<ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-5" />
				</h3>
				<Carousel className="w-[90%] m-auto ">
					<CarouselContent className="-ml-1">
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem
								key={index}
								className="pl-1 md:basis-1/2 lg:basis-1/4"
							>
								<div className="p-1">
									<Card>
										<CardContent className=" aspect-square p-6 flex flex-col justify-between">
											<div className="">
												<h2 className="text-2xl mb-2 font-bold">
													Exam Name:- <span className="capitalize">Jee</span>
												</h2>
												<h5 className="text-lg font-bold">Subjects:- </h5>
												<ul className="text-sm">
													<li>Math</li>
													<li>Physics</li>
												</ul>
											</div>
											<div className="text-right">
												<ShinyButton
													text="Details"
													className="font-bold rounded-xl"
												/>
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
			<Footer />
		</div>
	);
}

export default memo(Courses);
