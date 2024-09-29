"use client";
import React, { useEffect } from "react";
import { useBlogStore } from "@/store/Blogs";
import { useAuthStore } from "@/store/Auth";
import { toast } from "./ui/use-toast";
import BlogCard from "./layout/BlogCards";

function Blogs({ className }: { className: string }) {
	const { blogs, readAllFilesFromStorage, deleteBlog } = useBlogStore(
		(state) => ({
			blogs: state.blogs,
			readAllFilesFromStorage: state.readAllFilesFromStorage,
			deleteBlog: state.deleteBlog,
		})
	);
	const { userPrefs } = useAuthStore();
	const deleteBlogHandler = async (blogId: string) => {
		const response = await deleteBlog(blogId);
		if (!response.success) {
			toast({
				title: "Error",
				description: response.error?.message || "Something went wrong",
				variant: "destructive",
			});
			return;
		}
		toast({
			title: "Blog Deleted",
			description: "Blog has been deleted",
		});
	};
	useEffect(() => {
		async function fetch() {
			if (!blogs) {
				console.log("fetching blogs");
				await readAllFilesFromStorage();
			}
		}
		fetch();
	}, []);

	return (
		<div className={`grid ${className} px-4`}>
			{blogs?.map((blog) => (
				<BlogCard
					key={blog.id}
					blog={blog}
					userPrefs={userPrefs}
					deleteBlogHandler={deleteBlogHandler}
				/>
			))}
		</div>
	);
}

export default Blogs;
