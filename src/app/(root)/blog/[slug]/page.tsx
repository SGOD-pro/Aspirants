"use client";
import Loader from "@/components/layout/Loader";
import { getAuthState } from "@/global/AdminAuth";
import React, { useEffect, useState } from "react";

function Page() {
	const [userPrefs, setUserPrefs] = useState<any>();

	useEffect(() => {
		const { userPrefs } = getAuthState();
		setUserPrefs(userPrefs);
	}, []);


	if (!userPrefs?.isVerified) {
		return <div>Please verify your email</div>;
	}

	return <div>Blog slug page</div>;
}

export default Page;
