import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { getAuthState } from "@/global/AdminAuth";
import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function UserProfile() {
	const { user } = getAuthState();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);
	return (
		<Popover>
			<PopoverTrigger asChild className="bg-slate-800">
				<Button variant="outline" size="icon" className="rounded-full">
					{isMounted && user && user.photoURL ? (
						<span className="pointer-events-none">
							<Image
								src={user.photoURL}
								alt="Avatar"
								width={40}
								height={40}
								className="rounded-full pointer-events-none"
							/>
						</span>
					) : (
						<User className="w-5 h-5" />
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<h2 className="text-2xl">{user?.displayName}</h2>
				<p className="text-xs">{user?.email}</p>
				<div className="text-right">
					<Button variant={"destructive"}>Logout</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
export default UserProfile;
