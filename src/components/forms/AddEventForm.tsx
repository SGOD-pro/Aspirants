import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { z } from "zod";
import {
	Form,
	FormField,
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { eventSchema } from "@/models/EventSchema";
import { Textarea } from "@/components/ui/textarea";
import { useEventStore } from "@/global/Event";

function AddEventForm({
	defaultValue,
}: {
	defaultValue?: z.infer<typeof eventSchema>;
}) {
	const { addEvent } = useEventStore((state) => ({
		addEvent: state.addEvent,
	}));
	const form = useForm<z.infer<typeof eventSchema>>({
		resolver: zodResolver(eventSchema),
	});

	async function onSubmit(data: z.infer<typeof eventSchema>) {
		console.log(data);
		const response = await addEvent(data);
		if (!response.success) {
			toast({
				title: "Error",
				description: `${response.error}` || "Something went wrong",
				variant: "destructive",
			});
		} else {
			toast({
				title: "Success",
				description: "Event added",
			});
			form.reset(); // Reset all form fields
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-3">
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Textarea placeholder="Type your event here." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="validDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Valid Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												" pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

export default AddEventForm;
