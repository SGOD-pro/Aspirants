"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { useBlogStore } from "@/store/Blogs";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
Trash;
function Blogs() {
	const { blogs, readAllFilesFromStorage } = useBlogStore((state) => ({
		blogs: state.blogs,
		readAllFilesFromStorage: state.readAllFilesFromStorage,
	}));
	useEffect(() => {
		async function fetch() {
			if (!blogs) await readAllFilesFromStorage();
		}
		fetch();
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 lg:p-6">
			{blogs?.map((blog) => (
				<CardContainer className="inter-var">
					<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  h-auto rounded-xl p-6 border flex flex-col justify-between">
						<CardItem
							translateZ="50"
							className="text-xl font-bold text-neutral-600 dark:text-white"
						>
							{blog.data.title}
						</CardItem>
						<CardItem
							as="p"
							translateZ="60"
							className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
						>
							{blog.data.description}
						</CardItem>
						<CardItem translateZ="100" className="w-full mt-4">
							<Image
								src={blog.data.image}
								height="700"
								width="700"
								className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
								alt="thumbnail"
							/>
						</CardItem>
						<div className="flex justify-end items-center mt-20 gap-5">
							<CardItem translateZ={20} as="button">
								<Button
									variant={"destructive"}
									size={"icon"}
									className="px-4 py-2 h-fit w-fit"
								>
									<Trash className="h-4 w-4" />
								</Button>
							</CardItem>
							<CardItem
								translateZ={20}
								as="button"
								className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
							>
								<Link href={"#"}>Read More</Link>
							</CardItem>
						</div>
					</CardBody>
				</CardContainer>
			))}
		</div>
	);
}

export default Blogs;
