import { universitySchema } from "@/schema/UniversitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import FileInput from "../ui/FileInput";
import { toast } from "../ui/use-toast";
import { useUniversityStore } from "@/store/Universitys";
function AddTopers() {
	const { addUniversity } = useUniversityStore();
	const form = useForm<z.infer<typeof universitySchema>>({
		resolver: zodResolver(universitySchema),
	});
const [key, setKey] = React.useState(0)
	async function onSubmit(values: z.infer<typeof universitySchema>) {
		console.log(values);
		const response = await addUniversity(values);
		if (response.success) {
			toast({
				title: "University added!",
				description: (
					<pre className="mt-2 w-[340px] rounded-md p-4">
						<code className="text-white">
							{JSON.stringify(values, null, 2)}
						</code>
					</pre>
				),
			});
		} else {
			toast({
				title: "Error",
				description: "Something went wrong",
				variant: "destructive",
			});
		}
		form.reset();
		setKey((prev) => prev + 1);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.stopPropagation();
					form.handleSubmit(onSubmit)(e);
				}}
				className="space-y-4"
				key={key}
			>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Name" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>School/Collage</FormLabel>
							<FormControl>
								<RadioGroup
									className="flex gap-3 mt-2 items-center justify-around"
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormItem className="flex border w-full h-full rounded-lg">
										<label
											htmlFor="school"
											className="w-full px-4 py-3 h-full space-x-3"
										>
											<FormControl>
												<RadioGroupItem value="school" id="school" />
											</FormControl>
											<FormLabel className="font-normal" htmlFor="school">
												School
											</FormLabel>
										</label>
									</FormItem>
									<FormItem className="flex border w-full h-full rounded-lg">
										<label
											htmlFor="collage"
											className="w-full px-4 py-3 h-full space-x-3"
										>
											<FormControl>
												<RadioGroupItem value="collage" id="collage" />
											</FormControl>
											<FormLabel className="font-normal" htmlFor="collage">
												Collage
											</FormLabel>
										</label>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isSubmitting}>Submit</Button>
			</form>
		</Form>
	);
}

export default memo(AddTopers);
