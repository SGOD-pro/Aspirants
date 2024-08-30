import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { IconMenu, IconX } from "@tabler/icons-react";

export default function Header({ children }: { children: React.ReactNode }) {
	return (
		<div className="border-b border-white/70 p-4 flex justify-end">
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
		</div>
	);
}
