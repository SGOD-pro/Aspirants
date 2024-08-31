import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IconMenu } from "@tabler/icons-react";
import React from "react";

export default function Header({ children }: { children: React.ReactNode }) {
	const [isMobileView, setIsMobileView] = React.useState(false);
	React.useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth <= 640);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<>
			<header className="border-b border-white/70 p-4 flex gap-4 items-center justify-end sticky top-0 bg-slate-950/60 backdrop-blur">
				{isMobileView ? (
					<Sheet>
						<SheetTrigger asChild className="border">
							<Button variant="outline" className="rounded-full" size={"icon"}>
								<IconMenu className="text-primary" id="nav-toggle" />
							</Button>
						</SheetTrigger>
						<SheetContent className="">
							<div className="grid gap-4 py-4 mt-6">{children}</div>
						</SheetContent>
					</Sheet>
				) : (
					<>{children}</>
				)}
			</header>
		</>
	);
}
