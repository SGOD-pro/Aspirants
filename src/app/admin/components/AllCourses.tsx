import React, { memo } from "react";
import { LibraryBig } from "lucide-react";
import { coursesStore } from "@/global/CoursesStore";
import Link from "next/link";

function AllCourses() {
	const { courses } = coursesStore((state) => ({
		courses: state.courses,
	}));
	return (
		<Link href={"/admin/dashboard/courses"} className="flex gap-2 lg:gap-3 items-center bg-slate-800 rounded-xl md:justify-center hover:scale-95 transition-all py-5 px-4 md:p-0">
			<div className="">
				<div className="rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 p-5 md:p-3 lg:p-4">
					<LibraryBig className=" md:w-7  lg:w-10 w-12 h-12 md:h-7  lg:h-10" />
				</div>
			</div>
			<div className=" text-slate-200 ">
				<p className=" md:text-xs opacity-65 tracking-wider">All batches</p>
				<h2 className="text-3xl md:text-2xl lg:text-4xl font-bold">
					{courses?.length || 0}
				</h2>
			</div>
		</Link>
	);
}

export default memo(AllCourses);
