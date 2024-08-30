import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Raleway } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Raleway({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};
import Curtain from "@/components/Curtain";
import Navbar from "@/components/ui/floting-navbar";
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
			<body
				className={`${inter.className} scrollbar w-screen overflow-x-hidden body`}
			>
				{" "}
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Curtain />
					<Toaster />
					<Navbar />
					<Main>{children}</Main>
				</ThemeProvider>
			</body>
		</html>
	);
}
