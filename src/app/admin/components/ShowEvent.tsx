import { Button } from "@/components/ui/button";
import { Delete, Trash2 } from "lucide-react";
import React, { memo } from "react";
import { getEventStore, useEventStore } from "@/global/Event";
import { toast } from "@/components/ui/use-toast";

function ShowEvent() {
	const { deleteEvent } = getEventStore();
	const { events, fetchEvents } = useEventStore((state) => ({
		events: state.events,
		fetchEvents: state.fetchEvents,
	}));
	async function fetchRecord() {
		const resposne = await fetchEvents();
		if (!resposne.success) {
			toast({
				title: "Error",
				description: `${resposne.error?.message}` || "Something went wrong",
				variant: "destructive",
			});
		}
	}

	React.useEffect(() => {
		if (!events || events.length === 0) {
			fetchRecord();
		}
	}, []);
	return (
		<>
			{events && events.length > 0 ? (
				events.map((event, index) => (
					<div
						className="flex bg-slate-600/40 rounded-lg w-full gap-2 mb-2"
						key={index}
					>
						<div className="p-2 rounded-lg w-[90%] overflow-hidden">
							<p className="marquee">{event.description}</p>
						</div>
						<Button
							size={"icon"}
							className="bg-rose-500"
							onClick={() => deleteEvent(event.uid!)}
						>
							<Trash2 className="text-white" />
						</Button>
					</div>
				))
			) : (
				<p>No events</p>
			)}
		</>
	);
}

export default memo(ShowEvent);
