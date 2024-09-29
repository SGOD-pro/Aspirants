"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useBlogStore, BlogWithId } from "@/store/Blogs";
import Loading from "@/components/layout/Loader";
import BlogCard from "@/components/layout/BlogCards";
import BackButton from "@/components/BackButton";
import Search from "./Search";

function page({ params }: { params: { slug: string } }) {

	const { searchBlogsByTitle } = useBlogStore();
	const [input, setInput] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [blogs, setBlogs] = useState<BlogWithId[] | null>(null);
	async function fetch(text: string) {
		setLoading(true);
		const response = await searchBlogsByTitle(text);
		setLoading(false);
		if (response.success && Array.isArray(response.blogs)) {
			setBlogs(response.blogs);
		}
	}
	useEffect(() => {
		if (!params.slug) {
			return;
		}
		const text = decodeURI(params.slug);
		setInput(text);
		fetch(text);
	}, [params.slug]);

	return (
		<>
			{loading && (
				<div className="fixed h-dvh z-10 w-full flex items-center justify-center bg-slate-950">
					<Loading />
				</div>
			)}

			<main className="sm:py-20 p-4 ">
				<BackButton />
				<Search />
				{blogs && blogs.length > 0 ? (
					<section className="grid">
						{blogs.map((blog) => (
							<BlogCard key={blog.data.title} blog={blog} />
						))}
					</section>
				) : (
					<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-[#c4a8f07c] font-semibold text-center ">
						<div className="w-72 m-auto">
							<Image
								src={"/no-data.svg"}
								alt="no data"
								width={400}
								height={400}
								className="w-auto h-auto object-contain"
							></Image>
						</div>
						<h1 className="text-theme/70">No Data Found</h1>
					</div>
				)}
			</main>
		</>
	);
}

export default page;
