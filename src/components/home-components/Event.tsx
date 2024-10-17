import React, { useEffect } from "react";
import { Marquee } from "@/components/ui/marquee";
import { useEventStore } from "@/store/Event";
function Event() {
	const { events, fetchEvents, hydrated } = useEventStore((state) => ({
		events: state.events,
		fetchEvents: state.fetchEvents,
		hydrated: state.hydrated,
	}));
	useEffect(() => {
		if (!hydrated) {
			fetchEvents();
		}
	}, []);
	return (
		<Marquee className="[--duration:30s]" pauseOnHover>
			{events?.map((event) => (
				<>
					<span className="text-sm font-semibold text-gray-200 bg-neutral-800 p-2 px-3 rounded-md shadow-md shadow-gray-500/20">
						{event.description}
					</span>
					<span className="text-sm font-semibold text-gray-200 bg-neutral-800 p-2 px-3 rounded-md shadow-md shadow-gray-500/20">
						{event.description}
					</span>
					<span className="text-sm font-semibold text-gray-200 bg-neutral-800 p-2 px-3 rounded-md shadow-md shadow-gray-500/20">
						{event.description}
					</span>
					<span className="text-sm font-semibold text-gray-200 bg-neutral-800 p-2 px-3 rounded-md shadow-md shadow-gray-500/20">
						{event.description}
					</span>
				</>
			))}
		</Marquee>
	);
}

export default Event;
