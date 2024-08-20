"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function CarouselPlugin({
	cardContent,
	length,
}: {
	cardContent?: React.ReactNode;
	length?: number;
}) {
	const plugin = React.useRef(Autoplay({ delay: 5000 }));

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full max-w-lg xl:max-w-2xl"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index}>
						<div className="p-1">
							<Card>
								<CardContent className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-3 aspect-square lg:aspect-video items-center justify-center w-full h-full">
									<div className="w-32 h-32 xl:w-44 xl:h-44 rounded-full border-2 p-2 xl:p-3 m-auto">
										<Image
											width={200}
											height={200}
											src={"/girl1.jpg"}
											alt="Image"
											className="rounded-full w-full h-full object-cover"
										/>
									</div>
									<div className="">
										<h2 className="text-xl md:text-2xl border-b-2 font-bold pb-2">
											Joyoshree Sikder
										</h2>
										<p className="text-xs xl:text-sm opacity-70 pt-4">
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Facilis magni repellat odio provident, ipsa labore
											consequatur error! Dolore, provident aliquid?
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="hidden sm:flex"/>
			<CarouselNext className="hidden sm:flex" />
		</Carousel>
	);
}
export default CarouselPlugin;
