"use client";
import React, { lazy, Suspense } from "react";
import { IconPhotoPlus } from "@tabler/icons-react";
import Dialog from "@/components/Dialog";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const AddGallery = lazy(() => import("@/components/forms/AddGallery"));
const BlurFadeDemo = lazy(() => import("@/app/(root)/gallery/Gallery"));
function Gallery() {
	return (
		<>
			<Header>
				<Dialog content={<AddGallery />}>
					<Button variant={"outline"} size={"icon"} className="w-full sm:w-10 flex gap-3">
						<IconPhotoPlus />
						<div className="sm:hidden">Add Image</div>
					</Button>
				</Dialog>
			</Header>
			<Container>
				<div className="h-[calc(100dvh-5.5rem)] overflow-auto scrollbar rounded-lg relative">
					<Suspense fallback={<Skeleton className="h-full w-full" />}>
						<BlurFadeDemo />
					</Suspense>
				</div>
			</Container>
		</>
	);
}

export default Gallery;
