import React from "react";
import Image from "next/image";
import { SparklesPreview } from "@/components/SparkleCore";
function InstractorSection() {
	return (
		<>
			<div className="">
				<SparklesPreview />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center mb-12">
				<div className="w-80 h-96 m-auto relative overflow-hidden p-2 border-2 border-primary rounded-2xl">
					<Image
						width={300}
						height={300}
						src="/arnab.png"
						alt={"linear board demo"}
						className="h-full w-full object-cover object-top  rounded-xl saturate-125 contrast-125"
					></Image>
				</div>
				<div className="text-center lg:text-left mt-6 lg:mt-0 ">
					<h1 className="text-4xl font-bold">Hello there,</h1>
					<h2 className="text-4xl mb-3 font-semibold">
						I am <strong className="text-theme">ARNAB,</strong> your{" "}
						<span className="text-theme">instructor</span>
					</h2>
					<p className="text-slate-500 w-full p-3 sm:p-0 sm:max-w-md m-auto lg:m-0 lg:max-w-lg leading-tight">
						Welcome to my institution! I am here to guide you through an
						exciting journey of learning and growth. With years of experience
						and a passion for teaching, I am committed to helping you achieve
						your goals and excel in your studies.
					</p>
				</div>
			</div>
		</>
	);
}

export default InstractorSection;
