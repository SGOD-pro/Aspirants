"use client";
import React from "react";
import { getAuthState } from "@/global/AdminAuth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
// Where Inspiration Meets Information
function Blogs() {
	// const router = useRouter();
	// if (!getAuthState().userPrefs?.isVerified) {
	// 	router.push("/login");
	// }
	return (
		<div>
			<div className="h-[25dvh] md:h-[40dvh] flex items-end pb-10 md:pb-0 md:items-center justify-center">
				<div className="relative w-full text-center">
					<motion.h1
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="font-extrabold text-6xl md:text-9xl tracking-wider text-white/10 selection:bg-transparent pointer-events-none selection:text-slate-700 mix-blend-difference"
					>
						<strong>BLOGS</strong>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
						className="text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-tight text-white/60 text-lg md:text-2xl font-semibold"
					>
						Where Inspiration{" "}
						<span className="text-[#10dd55] font-semibold selection:text-black mix-blend-difference z-10">
							Meets
						</span>{" "}
						Information
					</motion.p>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-6">
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/girl11.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/img4.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/img4.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/girl12.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/img1.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/img4.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/girl2.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/img4.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/girl13.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/girl1.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							Make things float in air
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src="/img2.jpg"
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-between items-center mt-20">
							<CardItem
								translateZ={20}
								as={Link}
								href="https://twitter.com/mannupaaji"
								target="__blank"
								className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
							>
								Try now →
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								Read More
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
				
			</div>
			<Footer />
		</div>
	);
}

export default Blogs;
