import BlurFade from "@/components/ui/blur-fade";
import { useGalleryStore } from "@/global/GalleryStore";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/global/AdminAuth";
import React from "react";
import Loader from "@/components/layout/Loader";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

export default function BlurFadeDemo() {
	const { userPrefs } = useAuthStore();
	const { images, fetchImages, deleteImage } = useGalleryStore((state) => ({
		images: state.images,
		fetchImages: state.fetchImages,
		deleteImage: state.removeImages,
	}));
	const [loading, setLoading] = React.useState(false);
	const [view, setView] = React.useState(false);
	const [selectedImage, setSelectedImage] = React.useState("");

	const fetchMore = async (pageNo: number) => {
		setLoading(true);
		await fetchImages(pageNo);
		setLoading(false);
	};

	React.useEffect(() => {
		if (!images || images.length === 0) {
			console.log("No images found, fetching more...");
			fetchMore(1);
		}
	}, [images]);

	if (loading) {
		return (
			<div className="absolute w-full h-full top-20 left-0">
				<Loader />
			</div>
		);
	}

	if (!images || images.length === 0) {
		console.log("Nothing to show - no images available.");
		return (
			<h2 className="opacity-60 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				Nothing to show <span> - </span> no images available.
			</h2>
		);
	}

	const removeImages = async (id: string) => {
		if (!id) {
			toast({
				title: "Error",
				description: "Image not found",
				variant: "destructive",
			});
			return;
		}
		const response = await deleteImage(id);
		if (!response.success) {
			toast({
				title: "Error",
				//description: response.error || "Something went wrong",
				variant: "destructive",
			});
		}
	};

	const popup = () => {
		return (
			<div
				className={`fixed top-0 left-0 w-screen h-screen z-40 grid place-items-center 
                transition-all duration-300 ease-in-out
                ${view ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
				
			>
				<div className="w-full absolute h-full bg-slate-900/50 z-0" onClick={() => setView(false)}></div>
				{selectedImage && (
					<div className="rounded-xl overflow-hidden h-[80dvh] relative z-10">
						<Image
							width={800}
							height={600}
							src={selectedImage}
							alt="Selected Image"
							className="w-full h-full object-contain rounded-xl"
						/>
					</div>
				)}
			</div>
		);
	};

	return (
		<section id="photos">
			<div className="columns-2 gap-4 sm:columns-3 pt-3">
				{images.map((imageUrl, idx) => (
					<BlurFade key={imageUrl.uid} delay={0.25 + idx * 0.05} inView>
						<Image
							className="mb-4 size-full rounded-lg object-contain hover:brightness-50 brightness-100 transition-all group"
							src={imageUrl.photoURL}
							alt={`Random stock image ${idx + 1}`}
							width={800}
							height={600}
							onClick={() => {
								console.log("Image clicked:", imageUrl.photoURL);
								setSelectedImage(imageUrl.photoURL);
								setView(true);
							}}
						/>

						{userPrefs?.isAdmin && (
							<Button
								variant={"destructive"}
								className="absolute top-2 right-2"
								size={"icon"}
								onClick={() => removeImages(imageUrl.uid!)}
							>
								<Trash />
							</Button>
						)}
						<div className="absolute text-right z-10 bottom-2 right-3 pointer-events-auto">
							<p className="pointer-events-none">{imageUrl.createdAt + ""}</p>
						</div>
					</BlurFade>
				))}
			</div>

			{popup()}
		</section>
	);
}
