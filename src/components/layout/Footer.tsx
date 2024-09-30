"use client"
import Link from "next/link";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beam";
import {
	IconBrandInstagram,
	IconBrandWhatsapp,
	IconGps,
} from "@tabler/icons-react";
import { Noto_Sans } from "next/font/google";
import { Separator } from "@/components/ui/separator"

const notoSans = Noto_Sans({
	subsets: ["latin"],
	weight: ["400", "700"],
});

function Footer() {
	return (
		<footer className={` w-full rounded-t-[2rem] sm:rounded-t-[4rem] relative bg-slate-900/50 flex flex-col items-center justify-center antialiased mt-8 ${notoSans.className}`}>
			<div className="max-w-2xl mx-auto p-4 relative z-10">
				<h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-bold">
					We are on social
				</h1>

				<div className=" flex gap-4 justify-center my-4">
					<Link
						href="/"
						className="border rounded-full p-3 hover:bg-gradient-to-br hover:from-pink-600 hover:to-yellow-600 flex items-center justify-center duration-300"
					>
						<IconBrandInstagram className="text-white text-2xl" />
					</Link>

					<Link
						href="/"
						className="border rounded-full p-3 hover:bg-green-500 flex items-center justify-center "
					>
						<IconBrandWhatsapp className="text-white text-2xl" />
					</Link>
				</div>

				<div className="flex text-neutral-300 justify-around gap-5 md:justify-between text-center items-center">
					<p className="font-light">
						Contact no:{" "}
						<Link type="tel" href="tel:+919999999999" className="underline">
							+91 89676 65652
						</Link>
					</p>
					<div className="sm:hidden h-7 rounded-2xl bg-white/40 w-1"></div>

					<Link
						target="_blank"
						href="https://maps.app.goo.gl/ykAZqUKAMUXaQda49"
						className="font-light flex items-center gap-2 justify-center sm:justify-normal underline"
					>
						View on map <IconGps />
					</Link>
				</div>
			</div>
			<div className="text-center leading-none text-slate-600 z-10 p-3">
				<p>
					&copy; 2024 Aspirants Classes. All Rights Reserved.Designed and
					Developed by Aspirants Tech Team{". "}
					<Link href="/" className="underline">
						Privacy Policy | Terms of Service
					</Link>
				</p>
			</div>
			<BackgroundBeams />
		</footer>
	);
}

export default Footer;
