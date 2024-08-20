"use client";
import { getAuthState } from "@/global/AdminAuth";
import { notFound, useRouter } from "next/navigation";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth = getAuthState();
    const router=useRouter();
	if (!auth.userPrefs?.isAdmin) {
		router.push("/login");
	}

	return (
		<main className="grid grid-cols-[1fr,4fr] w-screen max-h-screen overflow-hidden">
			<div className="border-l p-2 pt-0 max-h-screen overflow-auto overflow-x-hidden scrollbar">
				{children}
			</div>
		</main>
	);
}
