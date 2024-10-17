import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Raleway } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
const raleway = Raleway({ subsets: ["latin"] });

import { Toaster } from "@/components/ui/toaster";
export const metadata = {
	title: "Aspirants Classes - Educational Excellence in Raniganj",

	description:
		"Aspirants Classes is a premier educational institution located in Raniganj, West Bengal. We offer top-notch coaching for school, competitive, and undergraduate courses, ensuring the highest quality education and guidance for students.",

	keywords: [
		"Aspirants Classes",
		"Raniganj",
		"Andal",
		"West Bengal",
		"Best coaching in Raniganj",
		"Educational institution",
		"Competitive exams coaching",
		"School courses",
		"Undergraduate courses",
		"Coaching classes",
		"Top coaching center",
	],
	openGraph: {
		title: "Aspirants Classes - Educational Excellence in Raniganj",
		description:
			"Providing high-quality coaching for school, undergraduate, and competitive courses in Raniganj, West Bengal. Join Aspirants Classes today for academic success.",
		url: "https://www.aspirantsclasses.com",
		siteName: "Aspirants Classes",
		images: [
			{
				url: "https://firebasestorage.googleapis.com/v0/b/aspirants-b1e24.appspot.com/o/icon%2F4.png?alt=media&token=43825505-8e01-41bd-bba1-6d674aa2b374",
				width: 1200,
				height: 630,
				alt: "Aspirants Classes",
			},
		],
		locale: "en_IN",
		type: "website",
	},

	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: "/favicon.ico",
	},
};
import Navbar from "@/components/layout/Navbar";
import Main from "./Main";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	notFound?: boolean;
	error?: boolean;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body
				className={`${raleway.className} scrollbar w-screen overflow-x-hidden body`}
			>
				{" "}
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster />
					<Navbar />
					<Main>{children}</Main>
				</ThemeProvider>
			</body>
		</html>
	);
}
