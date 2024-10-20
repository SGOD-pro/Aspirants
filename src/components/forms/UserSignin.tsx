"use client";
import React, { memo } from "react";
import { Input } from "../ui/hover-input";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userSigninSchema from "@/schema/UserSignIn";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { getAuthState } from "@/store/Auth";
import { notFound, useRouter } from "next/navigation";
import InputOTPForm from "./OtpValidation";
import { LoaderCircle } from "lucide-react";
import { MoveRight } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useRouteHistory } from "@/hooks/RoutesHistory";
function SignupForm() {
	const { login } = getAuthState();
	const { goBack } = useRouteHistory();
	const [verify, setVerify] = React.useState(false);

	const router = useRouter();
	const form = useForm<z.infer<typeof userSigninSchema>>({
		resolver: zodResolver(userSigninSchema),
	});

	async function onSubmit(values: z.infer<typeof userSigninSchema>) {
		try {
			const response = await login(values.email, values.password);
			if (response.error) {
				toast({
					title: "Invalid Credentials",
					description: "User not found",
					variant: "destructive",
				});
				return;
			}
			console.log(response.userPrefs);
			if (!response.userPrefs?.isVerified) {
				setVerify(true);
				return;
			}

			const role = response.userPrefs?.role;
			console.log(role);
			if (role === "admin") {
				router.push("/admin/dashboard");
				return;
			}
			goBack();
		} catch (error) {
			notFound();
		}
	}

	return (
		<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl px-3 lg:px-6">
			<Form {...form}>
				<form
					className={`my-8 ${verify ? "hidden" : "block"}`}
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<h2 className="text-2xl font-bold">Sign In</h2>
					<p className=" opacity-70 text-sm mb-4 font-semibold text-gray-500">
						Welcome back to Aspirants Classes.
					</p>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										id="email"
										placeholder="aspirantxyz@ac.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										id="password"
										placeholder="••••••••"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<button
						className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-4 flex items-center justify-center"
						type="submit"
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<LoaderCircle className=" animate-spin" />
						) : (
							<p className="flex gap-2 transition-all items-center hover:gap-5 justify-center">
								Sign in <MoveRight />
							</p>
						)}
						<BottomGradient />
					</button>
				</form>
			</Form>
			{verify && (
				<div className="my-8">
					<InputOTPForm />
				</div>
			)}
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-col space-y-2 w-full", className)}>
			{children}
		</div>
	);
};

export default memo(SignupForm);
