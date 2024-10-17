import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { University } from "@/schema/UniversitySchema";
import { db } from "@/config/client";
import {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
	where,
	query,
	DocumentReference,
} from "firebase/firestore";

interface universityWithId extends University {
	uid: string;
}

interface universityInterface {
	universities: universityWithId[] | null;
	setUniversities: () => Promise<{ success: boolean; error?: Error }>;
	addUniversity: (
		university: University
	) => Promise<{ success: boolean; error?: Error }>;
	removeUniversity: (
		id: string
	) => Promise<{ success: boolean; error?: Error }>;
}

const universityStore = create<universityInterface>()(
	immer((set) => ({
		universities: null,
		setUniversities: async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "universities"));
				const universities = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					uid: doc.id,
				})) as universityWithId[];
				set({ universities});
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
		addUniversity: async (university) => {
			const colRef = collection(db, "universities");
			const docRef: DocumentReference = await addDoc(colRef, university);
			const newUniversity: universityWithId = { ...university, uid: docRef.id };

			set((state) => ({
				universities: state.universities
					? [...state.universities, newUniversity]
					: [newUniversity],
			}));
			return { success: true };
		},
		removeUniversity: async (id) => {
			
			try {
				if (!id) {
					return { success: false, error: new Error("universities not found") };
				}
				await deleteDoc(doc(db, "students", id));
				set((state) => {
					if (!state.universities) {
						return;
					}
					state.universities = state.universities?.filter(
						(university) => university.uid !== id
					);
				});
				return { success: true };
			} catch (error) {
				return { success: false,error:error as Error };
				
			}
		},
	}))
);
export const useUniversityStore = () => universityStore.getState();
export { universityStore };
