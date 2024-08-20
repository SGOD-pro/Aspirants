import { Button } from "@/components/ui/button";
import { Delete, Trash2 } from "lucide-react";
import React from "react";
import { getEventStore, useEventStore } from "@/global/Event";

function ShowEvent() {
	const { deleteEvent } = getEventStore();
	const { events } = useEventStore(state => ({ events: state.events }));

	return (
		<>
			{events &&events.length>0 ? (
				events.map((event, index) => (
					<div className="flex bg-slate-600/40 rounded-lg w-full gap-2 mb-2" key={index}>
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
				<p >No events</p>
			)}
		</>
	);
}

export default ShowEvent;
