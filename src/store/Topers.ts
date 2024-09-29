import { db } from "@/config/client";
import uploadFile from "@/lib/UploadFiles";
import { addTopersSchemaType } from "@/models/ToperSchema";
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

export interface ToperSchemaWithId extends addTopersSchemaType {
	uid: string;
	photoURL: string;
}

interface ToperStore {
	topers: ToperSchemaWithId[] | null;
	hydrated: boolean;
	setHydrated(): void;
	addToper: (
		toper: addTopersSchemaType
	) => Promise<{ success: boolean; error?: Error }>;
	fetchTopers(): Promise<{ success: boolean; error?: Error }>;
	deleteToper(id: string): Promise<{ success: boolean; error?: Error }>;
}

const toperStore = create<ToperStore>()(
	immer((set, get) => ({
		topers: null,
		hydrated: false,
		setHydrated() {
			set({ hydrated: true });
		},

		fetchTopers: async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "topers"));
				const topers = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					uid: doc.id,
				})) as ToperSchemaWithId[];
				set({ topers });
				get().setHydrated();
				return { success: true };
			} catch (error) {
				console.log(error);
				return { success: false, error: error as Error };
			}
		},

		addToper: async (obj: addTopersSchemaType) => {
			try {
				const url = await uploadFile(obj.photo, "upload/topers");
				const docRef: DocumentReference = await addDoc(
					collection(db, "topers"),
					{
						name: obj.name,
						details: obj.details,
						photoURL: url.fileURL,
					}
				);
				const docId: string = docRef.id;
				set((state) => ({
					courses: state.topers
						? [...state.topers, { ...obj, uid: docId }]
						: [{ ...obj, uid: docId }],
				}));

				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
		deleteToper: async (id: string) => {
			try {
				await deleteDoc(doc(db, "courses", id));
				return { success: true };
				set((state) => ({
					courses: state.topers?.filter((toper) => toper.uid !== id) || null,
				}));
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
	}))
);

const getTopersStore = () => toperStore.getState();
export default getTopersStore;
export { toperStore };
