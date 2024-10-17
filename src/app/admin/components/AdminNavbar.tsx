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
	Image as ImageIcon,
	Server,
} from "lucide-react";
import { getAuthState } from "@/store/Auth";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
const links = [
	{
		name: "Home",
		link: "/admin/dashboard",
		icon: <LayoutPanelLeft className="w-4 h-4" />,
	},
	{
		name: "Courses",
		link: "/admin/dashboard/courses",
		icon: <Library className="w-4 h-4" />,
	},
	{
		name: "Fees",
		link: "/admin/dashboard/fees",
		icon: <IndianRupee className="w-4 h-4" />,
	},
	{
		name: "Blogs",
		link: "/admin/dashboard/blogs",
		icon: <Notebook className="w-4 h-4" />,
	},
	{
		name: "Layout",
		link: "/admin/dashboard/layout",
		icon: <Layers className="w-4 h-4" />,
	},
	{
		name: "Gallery",
		link: "/admin/dashboard/gallery",
		icon: <ImageIcon className="w-4 h-4" />,
	},
	{
		name: "Storage",
		link: "/admin/dashboard/storage",
		icon: <Server className="w-4 h-4" />,
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
		<nav className=" w-16 md:w-40 h-screen bg-gradient-to-b from-[#020814] to-[#000e33] overflow-auto">
			<h1 className="py-3 font-bold text-2xl px-2 hidden md:block">Admin</h1>
			<div className="py-2 font-bold text-2xl px-2 md:hidden text-center w-full h-14 ">
				<Image src={"/3.png"} width={80} height={80} alt={"A"} className="w-full h-full object-contain m-auto"/>
			</div>
			<ul className="sm:space-y-1 w-full border-y border-primary/50 sm:p-2 py-3">
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
				className="mt-5 flex gap-2 disabled:cursor-not-allowed md:w-fit mx-auto"
				onClick={Logout}
				disabled={disable}
				size={"sm"}
			>
				<span className="hidden md:block">Sign Out</span>
				<LogOut className="w-4 h-4" />
			</Button>
		</nav>
	);
}

export default AdminNavbar;
