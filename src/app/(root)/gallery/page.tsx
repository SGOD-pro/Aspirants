"use client";
import React, { lazy, Suspense } from "react";
import Loader from "@/components/layout/Loader";
const BlurFadeDemo = lazy(()=>import("./Gallery"));

function Gallery() {
	return (
		<div className="relative sm:pt-20 m-auto w-[90%]">
			<Suspense fallback={<Loader />}>
				<BlurFadeDemo />
			</Suspense>
		</div>
	);
}

export default Gallery;
