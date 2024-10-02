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
import { ToperSchemaWithId } from "@/store/Topers";
function CarouselPlugin({ topers }: { topers: ToperSchemaWithId[] }) {
	const plugin = React.useRef(Autoplay({ delay: 5000 }));

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full max-w-xl xl:max-w-4xl"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{topers.map((toper) => (
					<CarouselItem key={toper.uid}>
						<div className="p-1">
							<Card>
								<CardContent className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-3 aspect-square lg:aspect-video items-center justify-center w-full h-full">
									<div className="w-44 h-44 sm:w-64 sm:h-64 rounded-full border-2 p-2 xl:p-3 m-auto">
										<Image
											width={200}
											height={200}
											src={toper.photoURL}
											alt={toper.name[0]}
											className="rounded-full w-full h-full object-cover"
										/>
									</div>
									<div>
										<h2 className="text-2xl md:text-3xl border-b-2 font-bold pb-2 capitalize">
											{toper.name}
										</h2>
										<p className="text-xs xl:text-sm opacity-70 pt-4">
											{toper.details}
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="hidden sm:flex" />
			<CarouselNext className="hidden sm:flex" />
		</Carousel>
	);
}

export default CarouselPlugin;
