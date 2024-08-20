"use client";

import React, { useState } from "react";
import WordFadeIn from "../components/ui/text-generator";
import { motion } from "framer-motion";
import getAnimationColtrolStore from "@/global/Animation";
import { usePathname } from "next/navigation";
function Curtain() {
	const [animationComplete, setAnimationComplete] = useState(false);
	const { curtainAnimation, setCurtainAnimation } = getAnimationColtrolStore();
	console.log(curtainAnimation);
	const pathName = usePathname();
	if (pathName !== "/" || curtainAnimation) {
		return;
	}
	return (
		<div>
			<motion.div
				initial={{ y: 0 }}
				animate={animationComplete ? { y: "-100%" } : { y: 0 }}
				transition={{ duration: 0.5 }}
				className="fixed top-0 left-0 z-[100] bg-background w-screen h-[100dvh] grid place-content-center"
				onAnimationComplete={() => {
					setTimeout(() => {
						setCurtainAnimation(true);
					}, 5000);
				}}
			>
				<div className="w-2/3 text-center m-auto">
					<WordFadeIn
						words="A new way of learning"
						onAnimationComplete={() => setAnimationComplete(true)}
					/>
				</div>
			</motion.div>
		</div>
	);
}

export default Curtain;
