import { db } from "@/config/client";
import uploadFile from "@/lib/UploadFiles";
import { addTopersSchemaType } from "@/models/ToperSchema";
import {
	collection,
	deleteDoc,
	addDoc,
	doc,
	getDoc,
	getDocs,
	DocumentReference,
} from "firebase/firestore";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ToperSchemaWithId  {
	uid: string;
	photoURL: string;
	name: string;
	details: string;
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
				const docData: ToperSchemaWithId = {
					uid: docRef.id,
					photoURL: url.fileURL,
					name: obj.name,
					details: obj.details,
				};
				console.log(docData);
				set((state) => {
					state.topers
						? state.topers.push(docData)
						: (state.topers = [docData]);
				});
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
		deleteToper: async (id: string) => {
			try {
				await deleteDoc(doc(db, "topers", id));
				set((state) => ({
					topers: state.topers?.filter((toper) => toper.uid !== id) || null,
				}));
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
	}))
);

const getTopersStore = () => toperStore.getState();
export default getTopersStore;
export { toperStore };
