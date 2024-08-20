import BlurFade from "@/components/ui/blur-fade";
import { ImageDoc, useGalleryStore } from "@/global/GalleryStore";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/global/AdminAuth";
import React from "react";
import Loader from "@/components/layout/Loader";
import Image from "next/image";


export default function BlurFadeDemo() {
    const { userPrefs } = useAuthStore();
	const { images, fetchImages } = useGalleryStore((state) => ({
		images: state.images,
		fetchImages: state.fetchImages,
	}));
	const [loading, setLoading] = React.useState(false);

	const fetchMore = async (pageNo: number) => {
		setLoading(true);
		await fetchImages(pageNo);
		setLoading(false);
	};
	console.log(images);
	React.useEffect(() => {
		if (!images || images.length === 0) {
			console.log("No images found, fetching more...");
			fetchMore(0);
		}
	}, [images]);

	if (loading) {
		return (
			<div className="absolute w-full h-full top-20 left-0">
				<Loader />
			</div>
		);
	}

	// If loading is done but no images available, show "Nothing to show"
	if (!images || images.length === 0) {
		console.log("Nothing to show - no images available.");
		return (
			<h2 className="opacity-60 fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				Nothing to show <span> - </span> no images available.
			</h2>
		);
	}
  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3 pt-3">
        {images.map((imageUrl, idx) => (
          <BlurFade key={imageUrl.uid} delay={0.25 + idx * 0.05} inView>
            <Image
              className="mb-4 size-full rounded-lg object-contain"
              src={imageUrl.photoURL}
              alt={`Random stock image ${idx + 1}`}
              width={800}
              height={600}
            />
            {userPrefs?.isAdmin && (
              <Button variant={"destructive"} className="absolute top-2 right-2" size={"icon"} onClick={() => {}}>
                <Trash />
              </Button>
            )}
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
