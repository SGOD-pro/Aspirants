import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Course } from "@/models/CourseSchema";
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
	DocumentReference
} from "firebase/firestore";
import { capitalizeWords } from "@/lib/Capitalize";

interface Subject {
	name: string;
	uid?: string;
}

interface CourseWithId extends Course {
	uid?: string;
}
type UpdateSubjectFields = Partial<{
	name: string;
}>;
interface Courses {
	subjects: Subject[] | null;
	courses: CourseWithId[] | null;
	hydrated: boolean;
	setHydrated: () => void;
	allSubjects: () => Promise<{ success: boolean; error?: Error }>;
	allCourses: () => Promise<{ success: boolean; error?: Error }>;
	pushSubjects: (obj: Subject) => Promise<{ success: boolean; error?: Error }>;
	pushCourses: (obj: Course) => Promise<{ success: boolean; error?: Error }>;
	popSubjects: (id: string) => Promise<{ success: boolean; error?: Error }>;
	popCourses: (id: string) => Promise<{ success: boolean; error?: Error }>;
	updateSubjects: (
		id: string,
		obj: Subject
	) => Promise<{ success: boolean; error?: Error }>;
	updateCourses: (
		id: string,
		obj: Course
	) => Promise<{ success: boolean; error?: Error }>;
}

const coursesStore = create<Courses>()(
	persist(
		immer((set) => ({
			subjects: null,
			courses: null,
			hydrated: false,
			setHydrated: () => set({ hydrated: true }),

			allSubjects: async () => {
				try {
					const querySnapshot = await getDocs(collection(db, "subjects"));

					const subjects = querySnapshot.docs.map((doc) => ({
						...doc.data(),
						uid: doc.id,
					})) as Subject[];
					set({ subjects });
					return { success: true };
				} catch (error) {
					console.error("Error fetching subjects: ", error);
					return { success: false, error: error as Error };
				}
			},
			allCourses: async () => {
				try {
					const querySnapshot = await getDocs(collection(db, "courses"));
					const courses = querySnapshot.docs.map((doc) => ({
						...doc.data(),
						uid: doc.id,
					})) as CourseWithId[];
					set({ courses });
					return { success: true };
				} catch (error) {
					console.error("Error fetching courses: ", error);
					return { success: false, error: error as Error };
				}
			},
			pushSubjects: async (obj: Subject) => {
				try {
					obj.name = capitalizeWords(obj.name);
					const q = query(
						collection(db, "subjects"),
						where("name", "==", obj.name)
					);
					const querySnapshot = await getDocs(q);
					if (querySnapshot.size > 0) {
						return {
							success: false,
							error: new Error("Subject already exists"),
						};
					}
					await addDoc(collection(db, "subjects"), obj);

					set((state) => ({
						subjects: state.subjects ? [...state.subjects, obj] : [obj],
					}));
					return { success: true };
				} catch (error) {
					console.error("Error adding subject: ", error);
					return { success: false, error: error as Error };
				}
			},
			pushCourses: async (obj: Course) => {
				try {
					const docRef: DocumentReference = await addDoc(collection(db, "courses"), obj);
					const docId: string = docRef.id;
					set((state) => ({
						courses: state.courses ? [...state.courses, {...obj,uid:docId}] : [{...obj,uid:docId}],
					}));
					return { success: true };
				} catch (error) {
					console.error("Error adding course: ", error);
					return { success: false, error: error as Error };
				}
			},
			popSubjects: async (id: string) => {
				try {
					await deleteDoc(doc(db, "subjects", id));
					set((state) => ({
						subjects:
							state.subjects?.filter((subject) => subject.uid !== id) || null,
					}));
					return { success: true };
				} catch (error) {
					console.error("Error deleting subject: ", error);
					return { success: false, error: error as Error };
				}
			},
			popCourses: async (id: string) => {
				try {
					await deleteDoc(doc(db, "courses", id));
					set((state) => ({
						courses:
							state.courses?.filter((course) => course.uid !== id) || null,
					}));
					return { success: true };
				} catch (error) {
					console.error("Error deleting course: ", error);
					return { success: false, error: error as Error };
				}
			},
			updateSubjects: async (id: string, obj: Subject) => {
				try {
					const updateData: UpdateSubjectFields = {};
					if (obj.name) {
						updateData.name = obj.name;
					}
					await updateDoc(doc(db, "subjects", id), updateData);
					set((state) => ({
						subjects:
							state.subjects?.map((subject) =>
								subject.uid === id ? { ...subject, ...obj } : subject
							) || null,
					}));
					return { success: true };
				} catch (error) {
					console.error("Error updating subject: ", error);
					return { success: false, error: error as Error };
				}
			},
			updateCourses: async (id: string, obj: Course) => {
				try {
					await updateDoc(doc(db, "courses", id), obj);
					set((state) => ({
						courses:
							state.courses?.map((course) =>
								course.uid === id ? { ...course, ...obj } : course
							) || null,
					}));
					return { success: true };
				} catch (error) {
					console.error("Error updating course: ", error);
					return { success: false, error: error as Error };
				}
			},
		})),
		{
			name: "courses-store",
			onRehydrateStorage() {
				return (state, error) => {
					if (!error) state?.setHydrated();
				};
			},
		}
	)
);

export const getCourseStore = () => coursesStore.getState();
export { coursesStore };
