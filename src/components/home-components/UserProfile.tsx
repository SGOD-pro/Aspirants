import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthStore } from "@/store/Auth";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";

function UserProfile() {
	const {  logout, user } = useAuthStore((state) => ({
		logout: state.logout,
		user: state.user,
	}));
	const [isMounted, setIsMounted] = useState(false);
	const [logingout, setLogingout] = useState(false);
	const router=useRouter()
	const userLogout = async () => {
		setLogingout(true);
		const response = await logout();
		setLogingout(false);
		if (response.error) {
			toast({
				title: "Error",
				description: `${response.error}`,
				variant: "destructive",
			});
		} else {
			router.push("/login");
		}
	};
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
					<Button variant={"destructive"} onClick={userLogout} disabled={logingout}>Logout</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
export default UserProfile;
