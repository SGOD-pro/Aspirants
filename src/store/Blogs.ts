import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
	addDoc,
	DocumentReference,
	collection,
	getDocs,
	QuerySnapshot,
} from "firebase/firestore";
import { db } from "@/config/client"; // Your Firestore instance

interface BlogDetails {
	data: BlogData;
	content: string; // Markdown content or any other content
}

interface BlogStore {
	blogs: BlogDetails[] | null;
	hydrated: boolean;
	setHydrated: () => void;
	readAllFilesFromStorage: () => Promise<void>;
	addBlog: (blog: BlogDetails) => Promise<{ success: boolean; error?: Error }>;
}

export const useBlogStore = create<BlogStore>()(
	immer((set) => ({
		blogs: null,
		hydrated: false,

		setHydrated: () => {
			set((state) => {
				state.hydrated = true;
			});
		},

		async readAllFilesFromStorage() {
			try {
				// Get the reference to the "blogs" collection
				const blogsCollectionRef = collection(db, "blogs");

				// Fetch all documents from the "blogs" collection
				const querySnapshot: QuerySnapshot = await getDocs(blogsCollectionRef);

				// Transform the documents into an array of BlogDetails
				const blogs: BlogDetails[] = querySnapshot.docs.map((doc) => {
					const data = doc.data() as BlogData;
					const content = data.content || ""; // Assuming content is stored in the document

					return {
						data: {
							title: data.title,
							description: data.description,
							image: data.image,
							slug: data.slug,
							date: data.date,
							tags: data.tags || [],
						},
						content: content,
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

		// Function to add a new blog
		async addBlog(blog: BlogDetails) {
			try {
				const { data, content } = blog;

				// Store the blog metadata and content in Firestore
				const docRef: DocumentReference = await addDoc(
					collection(db, "blogs"),
					{
						title: data.title,
						description: data.description,
						slug: data.slug,
						tags: data.tags || [],
						date: data.date || new Date().toISOString(),
						content: content, // Storing the content directly in Firestore
						image: data.image, // Assuming image is stored as URL or path
					}
				);

				const docId: string = docRef.id;

				// Step 3: Update Zustand state
				set((state) => {
					state.blogs = state.blogs
						? [...state.blogs, { data, content }]
						: [{ data, content }];
				});

				return { success: true };
			} catch (error) {
				console.error("Error adding blog:", error);
				return { success: false, error: error as Error };
			}
		},
	}))
);
