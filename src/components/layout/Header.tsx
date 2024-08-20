import { Home } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { IconMenu } from "@tabler/icons-react";
IconMenu;
function Header({ children }: { children: React.ReactNode }) {
	return (
		<header className="border-b border-primary/60 py-3 flex justify-between sticky top-0 backdrop-blur-md z-20">
			<Button size={"icon"}>
				<Home />
			</Button>
			{children}
			{/* <div className="border rounded-full p-2">
				<IconMenu className="text-primary" />
			</div> */}
		</header>
	);
}

export default Header;
