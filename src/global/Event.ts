import { db } from "@/config/client";
import uploadFile from "@/lib/UploadFiles";
import {
	collection,
	deleteDoc,
	addDoc,
	doc,
	getDocs,
	DocumentReference,
} from "firebase/firestore";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { EventSchemaInterface } from "@/models/EventSchema";
interface eventSchemaWithId extends EventSchemaInterface {
	uid?: string;
}

interface ToperStore {
	events: eventSchemaWithId[] | null;
	addEvent: (
		toper: EventSchemaInterface
	) => Promise<{ success: boolean; error?: Error }>;
	
	deleteEvent(id: string): Promise<{ success: boolean; error?: Error }>;
	getEvents(): Promise<{ success: boolean; error?: Error }>;
}

const useEventStore = create<ToperStore>()(
	immer((set) => ({
	  events: null,
	  getEvents: async () => {
		try {
		  const querySnapshot = await getDocs(collection(db, "event"));
		  const events: eventSchemaWithId[] = [];
		  querySnapshot.forEach((doc) => {
			events.push({ ...doc.data(), uid: doc.id } as eventSchemaWithId);
		  });
		  set((state) => ({ ...state, events }));
		  return { success: true };
		} catch (error) {
		  return { success: false, error: error as Error };
		}
	  },
	  addEvent: async (obj: eventSchemaWithId) => {
		try {
		  const docRef: DocumentReference = await addDoc(
			collection(db, "event"),
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
  
		  await deleteDoc(doc(db, "event", id));
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
export { useEventStore }