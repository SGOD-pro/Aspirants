"use client";
import ProtectedRoute from "@/hooks/ProtectedRoute";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ProtectedRoute allowedRoles={["student"]}>
			<main className="grid grid-cols-[1fr,4fr] w-screen max-h-screen overflow-hidden">
				<div className="border-l p-2 pt-0 max-h-screen overflow-auto overflow-x-hidden scrollbar">
					{children}
				</div>
			</main>
		</ProtectedRoute>
	);
}
