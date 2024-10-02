import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, memo, Suspense } from "react";
import Dialog from "@/components/Dialog";
const CarouselPlugin = lazy(
	() => import("@/app/admin/components/AdminCarousel")
);
const ShowTopers = lazy(() => import("@/app/admin/components/ShowTopers"));
import { toperStore } from "@/store/Topers";
import { Fullscreen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

function ToperSection() {
	const { fetchTopers, topers, hydrated } = toperStore((state) => ({
		fetchTopers: state.fetchTopers,
		topers: state.topers,
		hydrated: state.hydrated,
	}));

	async function fetchRecord() {
		const response = await fetchTopers();
		if (!response.success) {
			toast({
				title: "Error",
				description: response.error?.message || "Something went wrong",
				variant: "destructive",
			});
		}
	}
	React.useEffect(() => {
		if (!hydrated) {
			fetchRecord();
		}
	}, []);
	return (
		<div className="relative">
			<div className="justify-end flex gap-3 lg:absolute right-2 mt-2 lg:mt-0">
				<Dialog
					title="Our Topers"
					content={
						<Suspense fallback={<Skeleton className="w-full h-80" />}>
							<ShowTopers />
						</Suspense>
					}
				>
					<Button
						variant={"outline"}
						className="flex gap-2 items-center"
						size={"icon"}
					>
						<Fullscreen />
					</Button>
				</Dialog>
			</div>
			<div className="flex justify-center w-[80%] m-auto items-center">
				{topers && topers.length > 0 ? (
					<Suspense fallback={<Skeleton className="w-full h-full" />}>
						<CarouselPlugin topers={topers} />
					</Suspense>
				) : (
					<h2 className="text-3xl text-slate-200/30">No Record</h2>
				)}
			</div>
		</div>
	);
}

export default memo(ToperSection);
