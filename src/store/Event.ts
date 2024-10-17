import { db } from "@/config/client";
import uploadFile from "@/lib/UploadFiles";
import {
	collection,
	deleteDoc,
	addDoc,
	doc,
	getDocs,
	DocumentReference,
	where,
	query,
} from "firebase/firestore";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { EventSchemaInterface } from "@/schema/EventSchema";
interface eventSchemaWithId extends EventSchemaInterface {
	uid?: string;
}

interface ToperStore {
	events: eventSchemaWithId[] | null;
	hydrated: boolean;
	addEvent: (
		toper: EventSchemaInterface
	) => Promise<{ success: boolean; error?: Error }>;

	deleteEvent(id: string): Promise<{ success: boolean; error?: Error }>;
	fetchEvents(): Promise<{ success: boolean; error?: Error }>;
}

const useEventStore = create<ToperStore>()(
	immer((set) => ({
		events: null,
		hydrated: false,
		fetchEvents: async () => {
			try {
				const today = new Date();
				const eventsRef = collection(db, "events");
				const q = query(eventsRef, where("validDate", ">", today));
				const querySnapshot = await getDocs(q);
				const events: eventSchemaWithId[] = [];
				querySnapshot.forEach((doc) => {
					events.push({ ...doc.data(), uid: doc.id } as eventSchemaWithId);
				});
				const allEventsSnapshot = await getDocs(eventsRef);
				allEventsSnapshot.forEach(async (doc) => {
					const event = doc.data() as eventSchemaWithId;
					const eventDate = new Date(event.validDate);
					if (eventDate <= today) {
						await deleteDoc(doc.ref);
					}
				});

				set((state) => ({ ...state, events, hyrated: true }));
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
		addEvent: async (obj: eventSchemaWithId) => {
			try {
				const docRef: DocumentReference = await addDoc(
					collection(db, "events"),
					obj
				);
				const docId: string = docRef.id;
				set((state) => ({
					events: state.events
						? [...state.events, { ...obj, uid: docId }]
						: [{ ...obj, uid: docId }],
				}));

				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
		deleteEvent: async (id: string) => {
			try {
				console.log("deleted");

				await deleteDoc(doc(db, "events", id));
				set((state) => ({
					events: state.events?.filter((event) => event.uid !== id) || null,
				}));
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
	}))
);

export const getEventStore = () => useEventStore.getState();
export { useEventStore };
