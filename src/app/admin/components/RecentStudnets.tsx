import React from "react";
import { UserRound } from "lucide-react";
function RecentStudnets() {
	return (
		<div className="md:border-x-2 border-slate-100/40 h-full">
			<div className="flex gap-2 lg:gap-3 items-center bg-slate-800 md:bg-transparent rounded-xl md:justify-center hover:scale-95 transition-all py-5 px-4 md:p-0 h-full">
				<div className="">
					<div className="rounded-full bg-gradient-to-tr from-green-600 to-green-400 p-3 lg:p-4">
						<UserRound className="md:w-10 w-8 h-8 md:h-10 " />
					</div>
				</div>
				<div className=" text-slate-200 ">
					<p className=" md:text-xs opacity-65 tracking-wider">
						Recent students
					</p>
					<h2 className="text-3xl md:text-2xl lg:text-4xl font-bold">60</h2>
					<p className=" md:text-xs opacity-65">last 30 day&apos;s</p>
				</div>
			</div>
		</div>
	);
}

export default RecentStudnets;
