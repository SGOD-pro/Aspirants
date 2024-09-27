import React, { memo } from "react";
import { UsersRound } from "lucide-react";
import { studentStore } from "@/store/StudentsStore";
import Link from "next/link";
function TotalStudent() {
	const { setTotalStudents, totalStudets } = studentStore((state) => ({
		setTotalStudents: state.setTotalStudents,
		totalStudets: state.totalStudents,
	}));
	
	async function fetchRecord() {
		await setTotalStudents();
	}

	React.useEffect(() => {
		if (totalStudets === 0) {
			fetchRecord();
		}
	}, []);

	return (
		<Link
			href={"/admin/dashboard/students"}
			className="flex gap-2 lg:gap-3 items-center bg-slate-800 rounded-xl md:justify-center hover:scale-95 transition-all py-5 px-4 md:p-0"
		>
			<div className="">
				<div className="rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 p-5 md:p-3 lg:p-4">
					<UsersRound className=" md:w-7  lg:w-10 w-12 h-12 md:h-7  lg:h-10" />
				</div>
			</div>
			<div className=" text-slate-200 ">
				<p className=" md:text-xs opacity-65 tracking-wider">Total students</p>
				<h2 className="text-3xl md:text-2xl lg:text-4xl font-bold">
					{totalStudets}
				</h2>
			</div>
		</Link>
	);
}

export default memo(TotalStudent);
