import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Student } from "@/models/StudentSchema";
import { db } from "@/config/client";
import {
	collection,
	updateDoc,
	deleteDoc,
	addDoc,
	doc,
	query,
	where,
	getDocs,
	DocumentReference,
	serverTimestamp,
} from "firebase/firestore";
import { capitalizeWords } from "@/lib/Capitalize";

export interface StudentWithId extends Student {
	uid: string;
	status?: boolean;
}

interface StudentStore {
	students: StudentWithId[] | null;
	hydrated: boolean;
	setAllStudents(): Promise<void>;
	addStudent(
		student: StudentWithId
	): Promise<{ success: boolean; error?: Error }>;
	updateStudent(
		studentId: string,
		updatedStudent: Partial<StudentWithId>
	): Promise<{ success: boolean; error?: Error }>;
	deleteStudent(
		studentId: string
	): Promise<{ success: boolean; error?: Error }>;
}

const studentStore = create<StudentStore>()(
	immer((set, get) => ({
		students: null,
		hydrated: false,

		setAllStudents: async () => {
			if (get().students) return;
			console.log("fetching students...");
			
			try {
				const querySnapshot = await getDocs(collection(db, "students"));
				const students = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					uid: doc.id,
				})) as StudentWithId[];
				set({ students, hydrated: true });
			} catch (error) {
				console.error("Error fetching students:", error);
			}
		},

		addStudent: async (student: StudentWithId) => {
			try {
				const colRef = collection(db, "students");
				const q = query(colRef, where("studentId", "==", student.studentId));
				const querySnapshot = await getDocs(q);

				if (querySnapshot.size > 0) {
					return {
						success: false,
						error: new Error("Student ID already exists"),
					};
				}

				student.name = capitalizeWords(student.name);
				const docRef: DocumentReference = await addDoc(colRef, {
					...student,
					createdAt: serverTimestamp(),
				});
				const docId: string = docRef.id;
				student.uid = docId;

				set((state) => {
					state.students?.push(student);
				});

				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},

		updateStudent: async (
			studentId: string,
			updatedStudent: Partial<StudentWithId>
		) => {
			if (!studentId) {
				return { success: false, error: new Error("Cannot get uid!") };
			}

			try {
				await updateDoc(doc(db, "students", studentId), updatedStudent);
				set((state) => {
					if (!state.students) return;
					state.students = state.students?.map((student) =>
						student.studentId === studentId
							? { ...student, ...updatedStudent }
							: student
					);
				});
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},

		deleteStudent: async (studentId: string) => {
			if (!studentId) {
				return { success: false, error: new Error("Cannot get uid!") };
			}

			try {
				await deleteDoc(doc(db, "students", studentId));
				set((state) => {
					if (!state.students) {
						return;
					}
					state.students = state.students?.filter(
						(student) => student.studentId !== studentId
					);
				});
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
	}))
);

export const getStudentStore = () => studentStore.getState();
export { studentStore };
