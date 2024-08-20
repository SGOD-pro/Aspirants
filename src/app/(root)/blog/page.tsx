"use client"
import React from "react";
import { getAuthState } from "@/global/AdminAuth";
import { useRouter } from "next/navigation";

function Blogs() {
	// const router = useRouter();
	// if (!getAuthState().userPrefs?.isVerified) {
	// 	router.push("/login");
	// }
	return <div>Blogs</div>;
}

export default Blogs;
