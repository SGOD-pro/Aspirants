"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { getAuthState } from "@/store/Auth";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

export default function InputOTPForm() {
	const router = useRouter();
	const { user } = getAuthState();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		if (!user?.uid) {
			toast({
				title: "INFO",
				description: "User not found",
			});
		}
		try {
			const response: any = await fetch("/api/verify-otp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ otp: data.pin, uid: user.uid }),
			});
			console.log(response);

			if (!response.ok) {
				toast({
					title: "Cannot verify",
					description: "Invalid OTP or expired",
				});
				return;
			}
			router.push("/");
		} catch (error) {
			toast({
				title: "Cannot verify",
				description: error instanceof Error ? error.message : "Unknown error",
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 ">
				<FormField
					control={form.control}
					name="pin"
					render={({ field }) => (
						<FormItem>
							<FormLabel>One-Time Password</FormLabel>
							<FormControl>
								<InputOTP maxLength={6} {...field}>
									<InputOTPGroup className="m-auto">
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormDescription>
								Please enter the one-time password sent to your email.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isSubmitting}>
					Verify
				</Button>
			</form>
		</Form>
	);
}
