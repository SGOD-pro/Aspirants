"use client";
import React from "react";
import { Input } from "../ui/hover-input";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userSignupSchema from "@/models/UserSignup";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import InputOTPForm from "./OtpValidation";
import { getAuthState } from "@/global/AdminAuth";
import { toast } from "../ui/use-toast";
import Spinner from "../layout/Spinner";
import { MoveRight } from "lucide-react";
export default function SignupForm() {
	const { createAccount } = getAuthState();
	const [emailSend, setEmailSend] = React.useState(false);
	const form = useForm<z.infer<typeof userSignupSchema>>({
		resolver: zodResolver(userSignupSchema),
	});
	const [loading, setLoading] = React.useState(false);
	async function onSubmit(values: z.infer<typeof userSignupSchema>) {
		setLoading(true);
		const response = await createAccount(values.email, values.password);
		console.log(response);
		setLoading(false);
		if (response.success) {
			setEmailSend(true);
		} else {
			toast({
				title: "Invalid Credentials",
				description: `${response?.error}` || "Something went wrong",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl px-3 lg:px-6">
			<Form {...form}>
				<form
					className={`my-8 ${emailSend ? "hidden" : "block"}`}
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<h2 className="text-2xl font-bold">Sign up</h2>
					<p className=" opacity-70 text-sm mb-4 font-semibold text-gray-500">
						Welcome to Aspirants Classes. We&#39;re excited to have you join us.
					</p>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										id="signupEmail"
										placeholder="projectmayhem@fc.com"
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
										id="signup-password"
										placeholder="••••••••"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										id="email"
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
						className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-4"
						type="submit"
					>
						{loading ? (
							<Spinner />
						) : (
							<p className="flex gap-2 transition-all items-center hover:gap-5 justify-center">
								Sign up <MoveRight />
							</p>
						)}
						<BottomGradient />
					</button>
				</form>
			</Form>
			{emailSend && (
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
