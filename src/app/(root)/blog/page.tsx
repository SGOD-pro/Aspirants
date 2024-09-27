"use client";
import React from "react";
import { motion } from "framer-motion";
import getAnimationControlStore from "@/store/Animation";
import { Search } from "lucide-react";
import Blogs from "@/components/Blogs";

// Where Inspiration Meets Information
function BlogsPage() {
	const { blogAnimation, setBlogAnimationCompleted } =
		getAnimationControlStore();
	const shouldAnimate =
		!blogAnimation.time || new Date() > new Date(blogAnimation.time);

	// const router = useRouter();
	// if (!getAuthState().userPrefs?.isVerified) {
	// 	router.push("/login");
	// }

	return (
		<div>
			<div className="h-[25dvh] md:h-[40dvh] flex items-end pb-10 md:pb-0 md:items-center justify-center">
				<div className="relative w-full text-center">
					<motion.h1
						initial={{
							opacity: shouldAnimate ? 0 : 1,
							y: shouldAnimate ? 50 : 0,
						}}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="font-extrabold text-6xl md:text-9xl tracking-wider text-white/10 selection:bg-transparent pointer-events-none selection:text-slate-700 mix-blend-difference"
					>
						<strong>BLOGS</strong>
					</motion.h1>
					<motion.p
						initial={{ opacity: shouldAnimate ? 0 : 1 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
						className="text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-tight text-white/60 text-lg md:text-2xl font-semibold"
					>
						Where Inspiration{" "}
						<span className="text-theme font-semibold selection:text-black mix-blend-difference z-10">
							Meets
						</span>{" "}
						Information
					</motion.p>
				</div>
			</div>
			<div className="">
				<form className="border-2 border-indigo-700 rounded-full max-w-xl mx-auto flex items-center px-4">
					<input
						type="text"
						className="outline-none h-full bg-transparent w-full py-2"
						placeholder="Search.."
					/>
					<button className="">
						<Search />
					</button>
				</form>
				<Blogs />
			</div>
		</div>
	);
}

export default BlogsPage;
