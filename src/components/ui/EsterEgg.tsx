"use client";
import * as React from "react";
import { motion, MotionProps } from "framer-motion";
import getAnimationColtrolStore from "@/store/Animation";

// Memoized AnimatedElement to prevent unnecessary re-renders
// Define the props for the AnimatedElement component
interface AnimatedElementProps extends MotionProps {
	className: string;
	children?: React.ReactNode;
}

// Memoized AnimatedElement to prevent unnecessary re-renders
const AnimatedElement: React.FC<AnimatedElementProps> = React.memo(
	function AnimatedElement({
		initial,
		animate,
		transition,
		className,
		children,
	}) {
		return (
			<motion.div
				initial={initial}
				animate={animate}
				transition={transition}
				className={`${className} will-change-transform`}
			>
				{children}
			</motion.div>
		);
	}
);

export default function EasterEgg() {
	const { curtainAnimation } = getAnimationColtrolStore();
	const [shouldAnimate, setShouldAnimate] = React.useState(false);

	React.useEffect(() => {
		if (!curtainAnimation) {
			const timeoutId = setTimeout(() => {
				setShouldAnimate(true);
			}, 2800);
			return () => clearTimeout(timeoutId);
		} else {
			setShouldAnimate(true);
		}
	}, [curtainAnimation]);
	const handleAllAnimationsComplete = () => {
		console.log("All animations in the container are complete!");
	};
	return (
		<motion.div className="grid grid-cols-[repeat(6,75px)] grid-rows-[repeat(8,75px)] font-roboto leading-tight tracking-tighter group w-fit"
		onAnimationComplete={handleAllAnimationsComplete}>
			<AnimatedElement
				initial={{ scale: 0, rotate: 0 }}
				animate={shouldAnimate ? { scale: 1, rotate: 360 } : {}}
				transition={{ duration: 1.5 }}
				className="bg-[#49FF2A] col-start-6 clip-triangle flex justify-center items-end"
			>
				<div className="clip-triangle bg-[#020817] w-[60%] h-[70%] translate-y-1 origin-bottom scale-0 group-hover:scale-100 transition-all duration-700"></div>
			</AnimatedElement>

			<AnimatedElement
				initial={{ x: -100, opacity: 0 }}
				animate={shouldAnimate ? { x: 0, opacity: 1 } : {}}
				transition={{ duration: 1 }}
				className="bg-[#3A95F0] col-start-2 flex items-center justify-center"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					S
				</h3>
			</AnimatedElement>

			<AnimatedElement
				initial={{ scale: 0.5, borderRadius: "0%", borderWidth: "60px" }}
				animate={
					shouldAnimate
						? { scale: 1, borderRadius: "2rem", borderWidth: "20px" }
						: {}
				}
				transition={{ duration: 1.2 }}
				className="bg-[#5131B6] rounded-bl-full border-[#5131B6] border-solid"
				style={{ borderWidth: "20px" }}
			></AnimatedElement>

			<AnimatedElement
				initial={{ scale: 0 }}
				animate={shouldAnimate ? { scale: 1 } : {}}
				transition={{ duration: 1.5 }}
				className="border-[#074FB1] border-[25px] rounded-full col-start-4 col-end-6 w-full"
			></AnimatedElement>

			<AnimatedElement
				initial={{ scale: 0 }}
				animate={shouldAnimate ? { scale: 1 } : {}}
				transition={{ duration: 1.5 }}
				className="border-[#1374FC] border-[20px] rounded-full"
			></AnimatedElement>

			<AnimatedElement
				initial={{ borderRadius: "0%" }}
				animate={shouldAnimate ? { borderRadius: "50%" } : {}}
				transition={{ duration: 1.2 }}
				className="bg-[#83E544] col-start-2 rounded-tl-full"
			></AnimatedElement>

			<AnimatedElement
				initial={{ x: -100, opacity: 0 }}
				animate={shouldAnimate ? { x: 0, opacity: 1 } : {}}
				transition={{ duration: 1 }}
				className="bg-[#49FF2A] col-start-5 flex items-center justify-center rounded-2xl"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					P
				</h3>
			</AnimatedElement>

			<AnimatedElement
				initial={{ scale: 0 }}
				animate={shouldAnimate ? { scale: 1 } : {}}
				transition={{ duration: 1.5 }}
				className="border-[#1374FC] border-[20px] rounded-tl-full col-start-2"
			></AnimatedElement>

			<AnimatedElement
				initial={{ x: 100, opacity: 0 }}
				animate={shouldAnimate ? { x: 0, opacity: 1 } : {}}
				transition={{ duration: 1 }}
				className="bg-[#A3072B] col-start-5 flex items-center justify-center"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					I
				</h3>
			</AnimatedElement>

			<AnimatedElement
				initial={{ borderRadius: "0 0 0 0" }}
				animate={shouldAnimate ? { borderRadius: "0 3.5rem 0 3.5rem" } : {}}
				transition={{ duration: 1.2 }}
				className="bg-[#DF2543] col-start-1 rounded-bl-[4.5rem] rounded-tr-[4.5rem] w-full col-end-3"
			></AnimatedElement>

			<AnimatedElement
				initial={{ borderRadius: "0%" }}
				animate={
					shouldAnimate ? { borderRadius: "1.5rem 1.5rem 1.5rem 0" } : {}
				}
				transition={{ duration: 1.2 }}
				className="bg-[#5131B6] flex items-center justify-center rounded-3xl rounded-bl-none"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					R
				</h3>
			</AnimatedElement>

			<AnimatedElement
				initial={{ scale: 0, rotate: 0 }}
				animate={shouldAnimate ? { scale: 1, rotate: 360 } : {}}
				transition={{ duration: 1.5 }}
				className="bg-[#49FF2A] clip-triangle flex justify-center items-end"
			>
				<div className="clip-triangle bg-[#020817] w-[60%] h-[70%] translate-y-1 origin-bottom relative z-10 scale-0 group-hover:scale-100 transition-all duration-700"></div>
			</AnimatedElement>

			<AnimatedElement
				initial={{ scale: 0 }}
				animate={shouldAnimate ? { scale: 1 } : {}}
				transition={{ duration: 1.5 }}
				className="border-[#91E73B] rounded-full border-[20px] rounded-tr-none"
			></AnimatedElement>

			<AnimatedElement
				initial={{ y: 100, opacity: 0 }}
				animate={shouldAnimate ? { y: 0, opacity: 1 } : {}}
				transition={{ duration: 1 }}
				className="bg-[#F5C629] col-start-2 flex items-center justify-center rounded-3xl rounded-tr-none"
			>
				<h3 className="text-7xl transition-all duration-700 font-extrabold text-transparent group-hover:text-[#020817]">
					N
				</h3>
			</AnimatedElement>

			<AnimatedElement
				initial={{ borderRadius: "50%" }}
				animate={shouldAnimate ? { borderRadius: "0%" } : {}}
				transition={{ duration: 1.2 }}
				className="bg-[#27D59C] col-start-5 rounded-full"
			></AnimatedElement>

			<AnimatedElement
				initial={{ borderRadius: "0%" }}
				animate={shouldAnimate ? { borderRadius: "50%" } : {}}
				transition={{ duration: 1.2 }}
				className="bg-[#FA231F] rounded-tr-full"
			></AnimatedElement>

			<AnimatedElement
				initial={{ borderRadius: "50%" }}
				animate={shouldAnimate ? { borderRadius: "0%" } : {}}
				transition={{ duration: 1.2 }}
				className="bg-[#BA2A11] col-start-2 rounded-bl-none rounded-full"
			></AnimatedElement>

			<AnimatedElement
				initial={{ y: -100 }}
				animate={shouldAnimate ? { y: 0 } : {}}
				transition={{ duration: 1 }}
				className="bg-[#772D98] col-start-5 row-start-7 row-end-9 flex items-center justify-around rounded-t-full rounded-b-full h-full flex-col"
			>
				<h3 className="transition-all duration-700 text-7xl font-extrabold text-transparent group-hover:text-[#020817]">
					T
				</h3>
				<h3 className="transition-all duration-700 text-7xl font-extrabold text-transparent group-hover:text-[#020817]">
					S
				</h3>
			</AnimatedElement>
		</motion.div>
	);
}