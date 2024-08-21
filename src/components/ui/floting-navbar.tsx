"use client";
import Link from "next/link";
import { easeIn, motion } from "framer-motion"; // Import Framer Motion
import { useState, useEffect, useRef, memo } from "react";
import { usePathname } from "next/navigation";
import { IconMenu3, IconX } from "@tabler/icons-react";
import { Headset } from "lucide-react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useAuthStore } from "@/global/AdminAuth";
import { LogOut } from "lucide-react";
import { Button } from "./button";
import Loader from "@/app/loading";
import { toast } from "./use-toast";
const NAV_ITEMS = [
	{ name: "Home", link: "/" },
	{ name: "Courses", link: "/courses" },
	{ name: "Blog", link: "/blog" },
	{ name: "Gallery", link: "/gallery" },
];

function Navbar() {
	const pathname = usePathname();
	const { scrollY } = useScroll();
	const [isScrolled, setIsScrolled] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const [isMobileView, setIsMobileView] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		setIsScrolled(latest > 150);
	});

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth <= 640);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if ((event.target as HTMLElement).tagName === "A") {
				setShowNav(false);
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);
	const [userPrefState, setUserPrefs] = useState<any>();
	const { userPrefs, logout } = useAuthStore((state) => ({
		userPrefs: state.userPrefs,
		logout: state.logout,
	}));

	const [logingout, setLogingout] = useState(false);
	const userLogout = async () => {
		setLogingout(true);
		const response = await logout();
		setLogingout(false);
		if (response.error) {
			toast({
				title: "Error",
				description: `${response.error}`,
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		setUserPrefs(userPrefs);
	}, [userPrefs]);
	const containerVariants = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const linkVariants = {
		hidden: { y: -5, opacity: 0, filter: "blur(10px)" },
		visible: { y: 0, opacity: 1, filter: "blur(0px)" },
	};
	if (logingout) {
		return <Loader />;
	}
	return (
		<div className={`${pathname.startsWith("/admin") ? "hidden" : "block"}`}>
			<div className="fixed right-0 top-0 -translate-x-full translate-y-full sm:hidden border p-2 rounded-full backdrop-blur bg-slate-950/10 z-50">
				<IconMenu3 onClick={() => setShowNav(true)} />
			</div>
			<nav
				className={`h-[100dvh] w-screen sm:h-fit sm:w-[80%] border p-10 sm:p-4 sm:px-5 backdrop-blur sm:bg-slate-950/40 bg-slate-950/95 flex flex-col sm:flex-row sm:justify-between text-3xl sm:text-base sm:items-center gap-10 sm:gap-0 m-auto fixed z-50 right-0  ${
					showNav ? "translate-x-0" : "translate-x-full"
				} sm:right-1/2 sm:translate-x-1/2 transition-all top-0 ${
					isScrolled
						? "sm:translate-y-1/2 sm:rounded-full sm:rounded-b-full"
						: "sm:-translate-y-0 sm:rounded-none sm:rounded-b-2xl"
				} ${pathname.startsWith("/admin") ? "hidden" : "block"}`}
			>
				<div className="sm:hidden text-right flex justify-end">
					<IconX className="w-10 h-10" onClick={() => setShowNav(false)} />
				</div>
				{isMobileView ? (
					<motion.div
						className="space-y-10 sm:space-x-6 sm:space-y-0 flex flex-col sm:block"
						variants={containerVariants}
						initial="hidden"
						animate={showNav ? "visible" : "hidden"}
					>
						{NAV_ITEMS.map((item) => (
							<motion.div key={item.name} variants={linkVariants}>
								<Link
									href={item.link}
									className={`${
										pathname !== `${item.link}`
											? "opacity-40 hover:opacity-55"
											: "opacity-100"
									} `}
								>
									{item.name}
								</Link>
							</motion.div>
						))}
						<motion.div variants={linkVariants}>
							{!userPrefState?.isVerified ? (
								<Link
									href="/login"
									className="rounded-full sm:px-4 sm:py-2 sm:border sm:text-sm hover:bg-gray-500/20 font-light w-fit underline sm:no-underline"
								>
									<span>Sign Up/In</span>
								</Link>
							) : (
								<Button className="rounded-full" variant={"destructive"}>
									<LogOut className="w-3 h-3" />
								</Button>
							)}
						</motion.div>
						<motion.div variants={linkVariants}>
							<Link
								href="/contactus"
								className="sm:p-2 sm:border rounded-full hover:bg-gray-500/20 w-fit flex items-center gap-1 underline sm:no-underline"
							>
								<Headset className="w-4 h-4 hidden sm:block" />
								<span className="sm:hidden">Contact us</span>
							</Link>
						</motion.div>
					</motion.div>
				) : (
					<div className="space-y-10 sm:space-x-6 sm:space-y-0 flex flex-col sm:block">
						{NAV_ITEMS.map((item) => (
							<Link
								href={item.link}
								key={item.name}
								className={`${
									pathname !== `${item.link}`
										? "opacity-40 hover:opacity-55"
										: "opacity-100"
								} `}
							>
								{item.name}
							</Link>
						))}
					</div>
				)}

				{!isMobileView && (
					<div className="sm:space-x-4 flex space-y-10 sm:space-y-0 sm:items-center flex-col sm:flex-row">
						<motion.div variants={linkVariants}>
							{!userPrefState?.isVerified ? (
								<Link
									href="/login"
									className="rounded-full sm:px-4 sm:py-2 sm:border sm:text-sm hover:bg-gray-500/20 font-light w-fit underline sm:no-underline"
								>
									<span>Sign Up/In</span>
								</Link>
							) : (
								<Button
									className="rounded-full p-2 h-fit w-fit"
									variant={"destructive"}
									onClick={userLogout}
								>
									<LogOut className="w-4 h-4" />
								</Button>
							)}
						</motion.div>
						<Link
							href="/contactus"
							className="sm:p-2 sm:border rounded-full hover:bg-gray-500/20 w-fit flex items-center gap-1 underline sm:no-underline"
						>
							<Headset className="w-4 h-4 hidden sm:block" />
							<span className="sm:hidden">Contact us</span>
						</Link>
					</div>
				)}
			</nav>
		</div>
	);
}

export default memo(Navbar);
