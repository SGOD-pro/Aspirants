import React, { memo } from "react";
import { LibraryBig } from "lucide-react";
import { coursesStore } from "@/store/CoursesStore";
import Link from "next/link";

function AllCourses() {
	const { courses, setCourses } = coursesStore((state) => ({
		courses: state.courses,
		setCourses: state.allCourses,
	}));
	async function fetchRecord() {
		await setCourses();
	}

	React.useEffect(() => {
		if (!courses || courses.length === 0) {
			fetchRecord();
		}
	}, []);
	return (
		<Link
			href={"/admin/dashboard/courses"}
			className="flex gap-2 lg:gap-3 items-center bg-slate-800 rounded-xl md:justify-center hover:scale-95 transition-all py-5 px-4 md:p-0"
		>
			<div className="">
				<div className="rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 p-3 lg:p-4">
					<LibraryBig className="md:w-10 w-8 h-8 md:h-10 " />
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
