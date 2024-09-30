"use client";
import Link from "next/link";
import React from "react";
import { useRouteHistory } from "@/hooks/RoutesHistory";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
	subsets: ["latin"],
	weight: ["400", "700"],
});
function NotFound() {
	const { goBack } = useRouteHistory();
	return (
		<div className="h-dvh w-screen overflow-hidden relative flex justify-center pt-10">
			<div className="relative flex justify-center items-center flex-col sm:flex-row w-full h-[70dvh]">
				<div className="sm:absolute text-center z-10">
					<h1 className={`text-9xl md:text-[9rem] font-extrabold mb-4 font-notoSans -z-30 ${notoSans.className}`}>
						404
					</h1>
					<Button
						onClick={goBack}
						className="p-3 md:px-4 md:py-3 bg-theme hover:bg-purple-800 rounded-lg md:text-xl z-50"
					>
						Go Back
					</Button>
				</div>
				<div className="border-b-2 border-slate-500 relative pointer-events-none z-40 ">
					<Image
						src="/404.svg"
						alt="404"
						width={800}
						height={600}
						className="w-[95%] h-[95%] sm:w-[90%] sm:h-[90%] object-contain m-auto pointer-events-none"
					/>
				</div>
			</div>
			<div className="circle bg-theme w-[120vw] h-[91vw] rounded-[60%] absolute bottom-0 -z-10 opacity-40 translate-y-[35%] sm:translate-y-[85%] left-1/2 -translate-x-1/2"></div>
		</div>
	);
}

export default NotFound;
