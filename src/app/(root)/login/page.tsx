"use client";
import { lazy, memo, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconBrandGoogle, IconBrandApple } from "@tabler/icons-react";
const SigninForm = lazy(() => import("@/components/forms/UserSignin"));
const SignupForm = lazy(() => import("@/components/forms/UserSignup"));
import { BackgroundGradientAnimation } from "@/components/ui/gradient-background";
import { getAuthState } from "@/store/Auth";
import { notFound, useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouteHistory } from "@/hooks/RoutesHistory";

const BottomGradient = memo(() => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
});
BottomGradient.displayName = "BottomGradient";
export default function TabsDemo() {
	const { signInWithGoogle } = getAuthState();
	const { goBack } = useRouteHistory();
	const GoogleSignin = async () => {
		try {
			const response = await signInWithGoogle();
			if (response.success) {
				goBack();
			} else {
				toast({
					title: "Invalid Credentials",
					description: `${response?.error}` || "Something went wrong",
					variant: "destructive",
				});
			}
		} catch (error) {
			notFound();
		}
	};
	return (
		<section className="flex min-h-screen items-center justify-center sm:pt-16">
			<div className="fixed top-0 left-0 -z-0 brightness-75 opacity-20">
				<BackgroundGradientAnimation />
			</div>
			<Tabs defaultValue="signin" className="w-[400px] z-20">
				<TabsList className="grid w-full grid-cols-2 ">
					<TabsTrigger value="signin">Sign In</TabsTrigger>
					<TabsTrigger value="signup">Sign Up</TabsTrigger>
				</TabsList>
				<TabsContent value="signin" className="bg-transparent">
					<Card>
						<Suspense fallback={<Skeleton className="w-full h-72" />}>
							<SigninForm />
						</Suspense>
					</Card>
				</TabsContent>
				<TabsContent value="signup">
					<Card>
						<Suspense fallback={<Skeleton className="w-full h-96" />}>
							<SignupForm />
						</Suspense>
					</Card>
				</TabsContent>
				<div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
				<div className="flex space-x-2 border rounded-lg p-3 justify-around bg-[#020817]">
					<button
						className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
						onClick={GoogleSignin}
					>
						<IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
						<span className="text-neutral-700 dark:text-neutral-300 text-sm">
							Google
						</span>
						<BottomGradient />
					</button>
					<button className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
						<IconBrandApple className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
						<span className="text-neutral-700 dark:text-neutral-300 text-sm">
							Apple Id
						</span>
						<BottomGradient />
					</button>
				</div>
			</Tabs>
		</section>
	);
}

