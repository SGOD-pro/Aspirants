"use client";
import React from "react";
import BlurFade from "@/components/ui/blur-fade";
import Image from "next/image";
import { ImageDoc, useGalleryStore } from "@/global/GalleryStore";
import { useAuthStore } from "@/global/AdminAuth";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/layout/Loader";
import  BlurFadeDemo  from "./Gallery";

function Gallery() {
	return (
		<div className="relative sm:pt-20 m-auto w-[90%]">
			<BlurFadeDemo />
		</div>
	);
}

export default Gallery;
