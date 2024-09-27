"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/models/adminAuth";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tranquiluxe } from "uvcanvas";
import { getAuthState } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
import { useToast } from "@/components/ui/use-toast";
function AdminLogin() {
	const route = useRouter();
	const { toast } = useToast();
	const { login } = getAuthState();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});
	const [disable, setDisable] = useState(true);

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		const { email, password } = values;
		setDisable(true);
		const response = await login(email, password);
		if (response.success) {
			console.log("Success", response);
			route.push("/admin/dashboard");
		} else {
			toast({
				title: "Invalid Credentials",
				description: `${response?.error}` || "Something went wrong",
				variant: "destructive",
			});
			setDisable(false);
		}
	}
	React.useEffect(() => {
        // Simulate a loading delay for demonstration, remove this in production
        const timer = setTimeout(() => {
            setDisable(false); // Enable the form after the component has mounted
        }, 1000);

        // Clean up the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, []);
	return (
		<div className="flex w-screen h-screen items-center justify-center">
			<div className="absolute w-full h-full opacity-30">
				<Tranquiluxe />
			</div>
			<div className="shadow-black shadow-md rounded-lg p-4 backdrop-blur-xl w-full lg:w-1/3 bg-slate-800/20">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="xyz@example.com"
											{...field}
											disabled={disable}
										/>
									</FormControl>
									<FormMessage className="text-rose-500" />
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
											placeholder="........"
											{...field}
											disabled={disable}
										/>
									</FormControl>
									<FormMessage className="text-rose-500" />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={disable}>
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}

export default AdminLogin;
