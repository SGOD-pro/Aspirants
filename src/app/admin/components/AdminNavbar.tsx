"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	LogOut,
	IndianRupee,
	Notebook,
	Library,
	Layers,
	LayoutPanelLeft,
	Image,
} from "lucide-react";
import { getAuthState } from "@/store/Auth";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
const links = [
	{
		name: "Home",
		link: "/admin/dashboard",
		icon: <LayoutPanelLeft className="md:w-4 md:h-4" />,
	},
	{
		name: "Courses",
		link: "/admin/dashboard/courses",
		icon: <Library className="md:w-4 md:h-4" />,
	},
	{
		name: "Fees",
		link: "/admin/dashboard/fees",
		icon: <IndianRupee className="md:w-4 md:h-4" />,
	},
	{
		name: "Blogs",
		link: "/admin/dashboard/blogs",
		icon: <Notebook className="md:w-4 md:h-4" />,
	},
	{
		name: "Layout",
		link: "/admin/dashboard/layout",
		icon: <Layers className="md:w-4 md:h-4" />,
	},
	{
		name: "Gallery",
		link: "/admin/dashboard/gallery",
		icon: <Image className="md:w-4 md:h-4" />,
	},
];

function AdminNavbar() {
	const { logout } = getAuthState();
	const { toast } = useToast();
	const router = useRouter();
	const pathname = usePathname();
	const [disable, setDisable] = useState(false);
	const Logout = async () => {
		setDisable(true);
		const response = await logout();
		console.log(response);
		
		if (response.success) {
			router.push("/");
		} else {
			setDisable(false);
			toast({
				title: "Invalid Credentials",
				description: `${response?.error}` || "Something went wrong",
				variant: "destructive",
			});
		}
	};
	return (
		<div className="p-2 md:p-4 w-full h-screen bg-gradient-to-b from-[#020817] to-[#1a1c1c] overflow-auto">
			<h1 className="py-3 font-bold text-2xl px-2 hidden md:block">Admin</h1>
			<h1 className="py-3 font-bold text-2xl px-2 md:hidden text-center">L</h1>
			<ul className=" space-y-1 w-full border-y border-primary/50 py-3">
				{links.map((link) => (
					<li className="w-full" key={link.name}>
						<Link href={link.link} className=" ">
							<p
								className={`flex gap-2 w-full p-2 ${
									pathname === link.link
										? "bg-primary/20"
										: "hover:bg-primary/20"
								} rounded-md  font-semibold items-center justify-center md:justify-start`}
							>
								{link.icon}
								<span className="hidden md:block">{link.name}</span>
							</p>
						</Link>
					</li>
				))}
			</ul>
			<Button
				variant="destructive"
				className="mt-5 flex gap-2 disabled:cursor-not-allowed w-full md:w-fit"
				onClick={Logout}
				disabled={disable}
			>
				<span className="hidden md:block">Sign Out</span>
				<LogOut />
			</Button>
		</div>
	);
}

export default AdminNavbar;
