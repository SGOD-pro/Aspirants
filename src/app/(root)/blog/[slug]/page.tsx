"use client";
import ProtectedRoute from "@/hooks/ProtectedRoute";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import Loader from "@/components/layout/Loader";
import BackButton from "@/components/BackButton";
import { useBlogStore } from "@/store/Blogs";
import Content from "./Content";
async function BlogView({ params }: { params: { slug: string } }) {
	const { getContent } = useBlogStore();
	const [loading, setLoading] = useState(false);
	const [content, setContent] = useState("");
	async function fetch() {
		setLoading(true);
		const response = await getContent(params.slug);
		setLoading(false);
		if (response.error || !response.content) {
			notFound();
		}
		setContent(response.content);
	}
	useEffect(() => {
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
					<div className="pt-10 p-5">
						<BackButton />
						<Content content={content} />
					</div>
				)}
			</ProtectedRoute>
		</>
	);
}

export default BlogView;
