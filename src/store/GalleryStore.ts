import { db, storage } from "@/config/client";
import uploadFile from "@/lib/UploadFiles";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
	addDoc,
	collection,
	serverTimestamp,
	DocumentReference,
	getDoc,
	deleteDoc,
	doc,
	query,
	orderBy,
	limit,
	startAfter,
	getDocs,
} from "firebase/firestore";
import { persist } from "zustand/middleware";
import { dateTime } from "@/lib/FormatDateTime";

export interface ImageDoc {
	photoURL: string;
	createdAt: Date | string;
	uid?: string;
}
interface GalleryStore {
	images: ImageDoc[] | null;
	addImages: (file: File) => Promise<{ success: boolean; error?: Error }>;
	removeImages: (id: string) => Promise<{ success: boolean; error?: Error }>;
	fetchImages: (
		pageToken: number
	) => Promise<{ success: boolean; error?: Error }>;
}

const useGalleryStore = create<GalleryStore>()(
	immer((set) => ({
		images: null,
		addImages: async (file: File) => {
			try {
				const fileURL = await uploadFile(file, "upload/gallery");
				const docRef: DocumentReference = await addDoc(
					collection(db, "gallery"),
					{
						photoURL: fileURL.fileURL,
						createdAt: serverTimestamp(),
					}
				);
				const docSnapshot = await getDoc(docRef);
				const docData: ImageDoc = {
					uid: docRef.id,
					photoURL: fileURL.fileURL,
					createdAt: dateTime(docSnapshot.data()?.createdAt.toDate()) || "",
				};
				console.log(docData);
				set((state) => {
					state.images
						? state.images.push(docData)
						: (state.images = [docData]);
				});
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
		removeImages: async (id: string) => {
			try {
				await deleteDoc(doc(db, "gallery", id));
				set((state) => ({
					images: state.images?.filter((toper) => toper.uid !== id) || null,
				}));
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
		fetchImages: async (pageNo: number) => {
			try {
				console.log("fetching images...");

				const galleryRef = collection(db, "gallery");
				const q = query(galleryRef, orderBy("createdAt", "desc"));
				const querySnapshot = await getDocs(collection(db, "gallery"));
				const images: ImageDoc[] = querySnapshot.docs.map((doc) => ({
					uid: doc.id,
					photoURL: doc.data().photoURL,
					createdAt: dateTime(doc.data().createdAt.toDate()) ||"",
				}));
				console.log(images);
				set({ images });
				return { success: true };
			} catch (error) {
				console.error("Error fetching images:", error);
				return { success: false, error: error as Error };
			}
		},
	}))
);
export { useGalleryStore };
