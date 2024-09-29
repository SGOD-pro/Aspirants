"use client";
import Link from "next/link";
import React from "react";
import {useRouteHistory} from "@/hooks/RoutesHistory";
import { Button } from "@/components/ui/button";

function NotFound() {
	const { goBack } = useRouteHistory();
	return (
		<div className="h-screen w-screen overflow-hidden relative flex items-center justify-center">
			<div className="absolute left-1/2 top-1/2 -translate-y-full md:left-1/2 md:top-1/3 -translate-x-4 md:-translate-x-8 md:-translate-y-1/4 text-center">
				<h1 className="text-5xl md:text-8xl font-extrabold mb-4">404</h1>
				<Button onClick={goBack} className="p-3 md:px-4 md:py-3 bg-cyan-600 rounded-lg md:text-xl">
					Go Back
				</Button>
			</div>
			<img
				src="/notFound.svg"
				alt=""
				className="w-[80%] h-[80%] object-contain"
			/>
		</div>
	);
}

export default NotFound;
