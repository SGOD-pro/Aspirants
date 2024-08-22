"use client";
import * as React from "react";
import { motion } from "framer-motion";
import getAnimationColtrolStore from "@/global/Animation";
export default function EsterEgg() {
	const { curtainAnimation, setCurtainAnimation } = getAnimationColtrolStore();
	return (
		<div className="grid grid-cols-[repeat(6,75px)] grid-rows-[repeat(8,75px)] font-roboto leading-tight tracking-tighter group w-fit">
			{/* First Element: Rotating Triangle */}
			<motion.div
				initial={{ scale: 0, rotate: 0 }}
				animate={{ scale: 1, rotate: 360 }}
				transition={{ duration: 1.5, delay:curtainAnimation?0:2.5 }}
				className="bg-[#49FF2A] col-start-6 clip-triangle flex justify-center items-end"
			>
				<div className="clip-triangle bg-[#020817] w-[60%] h-[70%] translate-y-1 origin-bottom scale-0 group-hover:scale-100 transition-all duration-700"></div>
			</motion.div>

			{/* Second Element: Border Expansion */}
			<motion.div
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 1, delay:curtainAnimation?0:2.5 }}
				className="bg-[#3A95F0] col-start-2 flex items-center justify-center"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					S
				</h3>
			</motion.div>

			{/* Third Element: Shape Morphing */}
			<motion.div
				initial={{ scale: 0.5, borderRadius: "0%", borderWidth: "60px" }}
				animate={{ scale: 1, borderRadius: "2rem", borderWidth: "20px" }}
				transition={{ duration: 1.2, delay:curtainAnimation?0:2.5 }}
				className="bg-[#5131B6] rounded-bl-full border-[#5131B6] border-solid"
				style={{ borderWidth: "20px" }}
			></motion.div>

			{/* Fourth Element: Border Expansion */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 1.5, delay:curtainAnimation?0:2.5 }}
				className="border-[#074FB1] border-[25px] rounded-full col-start-4 col-end-6 w-full"
			></motion.div>

			{/* Fifth Element: Border Expansion */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 1.5, delay:curtainAnimation?0:2.5 }}
				className="border-[#1374FC] border-[20px] rounded-full"
			></motion.div>

			{/* Sixth Element: Shape Morphing */}
			<motion.div
				initial={{ borderRadius: "0%" }}
				animate={{ borderRadius: "50%" }}
				transition={{ duration: 1.2, delay:curtainAnimation?0:2.5 }}
				className="bg-[#83E544] col-start-2 rounded-tl-full"
			></motion.div>

			{/* Seventh Element: Border Expansion */}
			<motion.div
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 1, delay:curtainAnimation?0:2.5 }}
				className="bg-[#49FF2A] col-start-5 flex items-center justify-center rounded-2xl"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					P
				</h3>
			</motion.div>

			{/* Eighth Element: Border Expansion */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 1.5, delay:curtainAnimation?0:2.5 }}
				className="border-[#1374FC] border-[20px] rounded-tl-full col-start-2"
			></motion.div>

			{/* Ninth Element: Sliding in Text */}
			<motion.div
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration: 1, delay:curtainAnimation?0:2.5 }}
				className="bg-[#A3072B] col-start-5 flex items-center justify-center"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					I
				</h3>
			</motion.div>

			{/* Tenth Element: Shape Morphing */}
			<motion.div
				initial={{ borderRadius: "0 0 0 0" }}
				animate={{ borderRadius: "0 3.5rem 0 3.5rem" }}
				transition={{ duration: 1.2, delay:curtainAnimation?0:2.5 }}
				className="bg-[#DF2543] col-start-1 rounded-bl-[4.5rem] rounded-tr-[4.5rem] w-full col-end-3"
			></motion.div>

			{/* Eleventh Element: Shape Morphing */}
			<motion.div
				initial={{ borderRadius: "0%" }}
				animate={{ borderRadius: "1.5rem 1.5rem 1.5rem 0" }}
				transition={{ duration: 1.2, delay:curtainAnimation?0:2.5 }}
				className="bg-[#5131B6] flex items-center justify-center rounded-3xl rounded-bl-none"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					R
				</h3>
			</motion.div>

			{/* Twelfth Element: Rotating Triangle */}
			<motion.div
				initial={{ scale: 0, rotate: 0 }}
				animate={{ scale: 1, rotate: 360 }}
				transition={{ duration: 1.5, delay:curtainAnimation?0:2.5 }}
				className="bg-[#49FF2A] clip-triangle flex justify-center items-end"
			>
				<div className="clip-triangle bg-[#020817] w-[60%] h-[70%] translate-y-1 origin-bottom relative z-10 scale-0 group-hover:scale-100 transition-all duration-700"></div>
			</motion.div>

			{/* Thirteenth Element: Border Expansion */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 1.5, delay:curtainAnimation?0:2.5 }}
				className="border-[#91E73B] rounded-full border-[20px] rounded-tr-none"
			></motion.div>

			{/* Fourteenth Element: Border Expansion */}
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, delay:curtainAnimation?0:2.5 }}
				className="bg-[#F5C629] col-start-2 flex items-center justify-center rounded-3xl rounded-tr-none"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					N
				</h3>
			</motion.div>

			{/* Fifteenth Element: Shape Morphing */}
			<motion.div
				initial={{ borderRadius: "50%" }}
				animate={{ borderRadius: "0%" }}
				transition={{ duration: 1.2, delay:curtainAnimation?0:2.5 }}
				className="bg-[#27D59C] col-start-5 rounded-full"
			></motion.div>

			{/* Sixteenth Element: Shape Morphing */}
			<motion.div
				initial={{ borderRadius: "0%" }}
				animate={{ borderRadius: "50%" }}
				transition={{ duration: 1.2, delay:curtainAnimation?0:2.5 }}
				className="bg-[#FA231F] rounded-tr-full"
			></motion.div>

			{/* Seventeenth Element: Shape Morphing */}
			<motion.div
				initial={{ borderRadius: "50%" }}
				animate={{ borderRadius: "0%" }}
				transition={{ duration: 1.2, delay:curtainAnimation?0:2.5 }}
				className="bg-[#BA2A11] col-start-2 rounded-bl-none rounded-full"
			></motion.div>

			{/* Eighteenth Element: Vertical Movement */}
			<motion.div
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 1, delay:curtainAnimation?0:2.5 }}
				className="bg-[#772D98] col-start-5 row-start-7 row-end-9 flex items-center justify-around rounded-t-full rounded-b-full h-full flex-col"
			>
				<h3 className="transition-all duration-700 text-7xl font-extrabold text-transparent group-hover:text-[#020817]">
					T
				</h3>
				<h3 className="transition-all duration-700 text-7xl font-extrabold text-transparent group-hover:text-[#020817]">
					S
				</h3>
			</motion.div>
		</div>
	);
}