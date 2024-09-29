import { create } from "zustand";
import {
	ref,
	uploadBytes,
	listAll,
	deleteObject,
	getDownloadURL,
} from "firebase/storage";
import { storage } from "@/config/client";
import { immer } from "zustand/middleware/immer";

interface FileStoreState {
	files: { name: string; url: string }[];
	loading: boolean;
	error: string | null;
	fetchFiles: (path: string) => Promise<void>;
	uploadFile: (path: string, file: File) => Promise<void>;
	deleteFile: (path: string, fileName: string) => Promise<void>;
}

export const useFileStore = create<FileStoreState>()(
	immer((set) => ({
		files: [],
		loading: false,
		error: null,

		fetchFiles: async (path: string) => {
			set({ loading: true, error: null });
			const storageRef = ref(storage, path);

			try {
				const res = await listAll(storageRef);
				const files = await Promise.all(
					res.items.map(async (itemRef) => {
						const url = await getDownloadURL(itemRef);
						return { name: itemRef.name, url };
					})
				);
				set({ files, loading: false });
			} catch (error) {
				set({ error: (error as Error).message, loading: false });
			}
		},

		// Upload file to Firebase Storage
		uploadFile: async (path: string, file: File) => {
			set({ loading: true, error: null });
			const fileRef = ref(storage, `${path}/${file.name}`);

			try {
				await uploadBytes(fileRef, file);
				const url = await getDownloadURL(fileRef);
				set((state) => ({
					files: [...state.files, { name: file.name, url }],
					loading: false,
				}));
			} catch (error) {
				set({ error: (error as Error).message, loading: false });
			}
		},

		// Delete file from Firebase Storage
		deleteFile: async (path: string, fileName: string) => {
			set({ loading: true, error: null });
			const fileRef = ref(storage, `${path}/${fileName}`);

			try {
				await deleteObject(fileRef);
				set((state) => ({
					files: state.files.filter((file) => file.name !== fileName),
					loading: false,
				}));
			} catch (error) {
				set({ error: (error as Error).message, loading: false });
			}
		},
	}))
);
