import { Home } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { IconMenu } from "@tabler/icons-react";
IconMenu;
function Header({ children }: { children: React.ReactNode }) {
	const [showNav, setShowNav] = React.useState(false);
	const navbar = () => {
		setShowNav(false);
	};
	React.useEffect(() => {
		document.addEventListener("click", navbar);
		return () => {
			document.removeEventListener("click", navbar);
		};
	}, []);

	return (
		<header className="border-b border-primary/60 py-3 flex justify-between sticky top-0 backdrop-blur-md z-20">
			<Button size={"icon"}>
				<Home />
			</Button>
			<div
				className={` fixed top-0 -right-0 ${
					showNav ? "-translate-x-0" : "translate-x-full sm:translate-x-0"
				} z-20  w-72 sm:w-fit h-[100dvh] sm:h-fit bg-slate-950 sm:static flex flex-col sm:flex-row gap-3 sm:py-1 p-4 sm:p-0 transition-all`}
			>
				{children}
			</div>
			<div
				className="sm:hidden border rounded-full p-2 hover:bg-slate-800/40"
				onClick={() => setShowNav(true)}
			>
				<IconMenu className="text-primary" />
			</div>
		</header>
	);
}

export default Header;
