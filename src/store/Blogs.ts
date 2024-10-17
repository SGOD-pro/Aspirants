import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
	addDoc,
	DocumentReference,
	collection,
	getDocs,
	getDoc,
	doc,
	deleteDoc,
	QuerySnapshot,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "@/config/client"; // Your Firestore instance

interface BlogDetails {
	data: BlogData;
	content?: string; // Markdown content or any other content
}
export interface BlogWithId extends BlogDetails {
	id: string;
}
interface BlogStore {
	blogs: BlogWithId[];
	hydrated: boolean;
	setHydrated: () => void;
	readAllFilesFromStorage: () => Promise<void>;
	addBlog: (blog: BlogDetails) => Promise<{ success: boolean; error?: Error }>;
	deleteBlog: (id: string) => Promise<{ success: boolean; error?: Error }>;
	updateBlog: (
		id: string,
		blog: BlogDetails
	) => Promise<{ success: boolean; error?: Error }>;
	searchBlogsByTitle: (
		title: string
	) => Promise<{ success: boolean; blogs?: BlogWithId[]; error?: Error }>;
	getContent: (
		id: string
	) => Promise<{ success: boolean; error?: Error; content?: string }>;
	checkIfBlogExists: (
		data: BlogData
	) => Promise<{ isExists: boolean; id?: string }>;
}

export const useBlogStore = create<BlogStore>()(
	immer((set) => ({
		blogs: [],
		hydrated: false,

		setHydrated: () => {
			set((state) => {
				state.hydrated = true;
			});
		},

		async readAllFilesFromStorage() {
			try {
				const blogsCollectionRef = collection(db, "blogs");

				const querySnapshot: QuerySnapshot = await getDocs(blogsCollectionRef);

				const blogs: BlogWithId[] = querySnapshot.docs.map((doc) => {
					const data = doc.data() as BlogData;
					return {
						id: doc.id,
						data: {
							title: data.title,
							description: data.description,
							image: data.image,
							slug: data.slug,
							date: data.date,
							tags: data.tags || [],
						},
					};
				});

				// Update Zustand store with the fetched blog details
				set((state) => {
					state.blogs = blogs;
				});

				console.log("Blogs fetched:", blogs); // For debugging purposes
			} catch (error) {
				console.error("Error fetching blog documents from Firestore:", error);
			}
		},

		async addBlog(blog: BlogDetails) {
			try {
				const { data, content } = blog;
				const docRef: DocumentReference = await addDoc(
					collection(db, "blogs"),
					{
						title: data.title,
						description: data.description,
						slug: data.slug,
						tags: data.tags || [],
						date: data.date || new Date().toISOString(),
						content: content,
						image: data.image,
					}
				);

				const docId: string = docRef.id;

				set((state) => {
					state.blogs = state.blogs
						? [...state.blogs, { data, id: docId }]
						: [{ data, id: docId }];
				});

				return { success: true };
			} catch (error) {
				console.error("Error adding blog:", error);
				return { success: false, error: error as Error };
			}
		},
		async checkIfBlogExists(
			data: BlogData
		): Promise<{ isExists: boolean; id?: string }> {
			try {
				const blogsRef = collection(db, "blogs");
				const q = query(blogsRef, where("title", "==", data.title));
				const querySnapshot = await getDocs(q);
				if (!querySnapshot.empty) {
					return { isExists: true, id: querySnapshot.docs[0].id };
				}
				return { isExists: false };
			} catch (error) {
				console.error("Error checking if blog exists:", error);
				return { isExists: false };
			}
		},
		async updateBlog(id: string, blog: Partial<BlogDetails>) {
			try {
				if (!id || !blog) {
					return { success: false, error: new Error("Cannot get uid!") };
				}

			await updateDoc(doc(db, "blogs", id), blog);
				set((state) => ({
					blogs:
						state.blogs?.map((blog) =>
							blog.id === id
								? {
										...blog,
										data: { ...blog.data, ...blog.data },
										content: blog.content,
								  }
								: blog
						),
					}));
				return { success: true };
			} catch (error) {
				console.error("Error updating blog:", error);
				return { success: false, error: error as Error };
			}
		},
		async getContent(id) {
			try {
				const docRef = doc(collection(db, "blogs"), id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					return {
						success: true,
						content: docSnap.data().content,
					};
				} else {
					return {
						success: false,
						error: "No such document!",
					};
				}
			} catch (error: any) {
				console.error("Error fetching document:", error);
				return {
					success: false,
					error: error.message, // Return the error message
				};
			}
		},
		deleteBlog: async (id: string) => {
			try {
				await deleteDoc(doc(db, "blogs", id));
				set((state) => ({
					blogs: state.blogs?.filter((blog) => blog.id !== id) || null,
				}));
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
		async searchBlogsByTitle(title: string) {
			try {
				// Fetch all blogs or a large subset of them
				const blogsCollectionRef = collection(db, "blogs");
				const querySnapshot = await getDocs(blogsCollectionRef);

				// Filter blogs client-side
				const blogs: BlogWithId[] = querySnapshot.docs
					.map((doc) => {
						const data = doc.data() as BlogData;
						return {
							id: doc.id,
							data: {
								title: data.title,
								description: data.description,
								image: data.image,
								slug: data.slug,
								date: data.date,
								tags: data.tags || [],
							},
						};
					})
					.filter((blog) =>
						blog.data.title.toLowerCase().includes(title.toLowerCase())
					);

				return { success: true, blogs };
			} catch (error) {
				console.error("Error searching blogs by title:", error);
				return { success: false, error: error as Error };
			}
		},
	}))
);
