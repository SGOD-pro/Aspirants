"use client"
import AdminNavbar from "@/app/admin/components/AdminNavbar";
import {getAuthState} from "@/global/AdminAuth"
import { notFound } from "next/navigation";
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth=getAuthState();
	if (!auth.userPrefs?.isAdmin||!auth.userPrefs?.isVerified) {
		notFound();
	}
	return (
		<main className="grid grid-cols-[1fr,4fr] w-screen max-h-[100dvh] overflow-hidden">
			<AdminNavbar />
			<div className="border-l p-2 pt-0 max-h-[100dvh]  overflow-auto overflow-x-hidden scrollbar">{children}</div>
		</main>
	);
}
