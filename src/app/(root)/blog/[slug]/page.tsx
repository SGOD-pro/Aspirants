"use client";
import ProtectedRoute from "@/hooks/ProtectedRoute";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Loader from "@/components/layout/Loader";
import BackButton from "@/components/BackButton";
import { useBlogStore } from "@/store/Blogs";
import Content from "./Content";
import "./custom.css";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
	subsets: ["latin"],
	weight: ["400", "700"],
});
function BlogView({ params }: { params: { slug: string } }) {
	const { getContent } = useBlogStore();
	const [loading, setLoading] = useState(false);
	const [content, setContent] = useState("");
	const [error, setError] = useState<boolean>(false);
	if (error) {
		notFound();
	}
	async function fetch() {
		setLoading(true);
		const response = await getContent(params.slug);
		setLoading(false);
		if (response.error || !response.content) {
			setError(true);
			return;
		}
		setContent(response.content);
	}
	useEffect(() => {
		console.log("fetching blog content...");
		fetch();
	}, []);

	return (
		<>
			<ProtectedRoute allowedRoles={["admin", "normal"]}>
				{loading ? (
					<div className="fixed w-full h-dvh flex justify-center pt-20">
						<Loader />
					</div>
				) : (
					<div className={`pt-24 sm:pt-20 p-5 ${notoSans.className}`}>
						<div className="">
							<BackButton />
						</div>
						<Content content={content} />
					</div>
				)}
			</ProtectedRoute>
		</>
	);
}

export default BlogView;
