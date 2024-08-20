import Loader from "@/components/layout/Loader";
import React from "react";

function Loading() {
	return (
		<div className="fixed top-0 left-0 w-screen h-screen bg-slate-800/40 grid place-items-center z-[60]">
			<Loader />
		</div>
	);
}

export default Loading;
