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
interface StudentWithId extends Student {
	uid?:string
}

interface StudentStore {
	students: StudentWithId[] | null;
	setAllStudents(): Promise<void>;
	addStudent(student: StudentWithId): Promise<{ success: boolean; error?: Error }>;
	updateStudent(
		studentId: string,
		updatedStudent: Partial<StudentWithId>
	): Promise<{ success: boolean; error?: Error }>;
	deleteStudent(
		studentId: string
	): Promise<{ success: boolean; error?: Error }>;
	hydrated: boolean;
}

const studentStore = create<StudentStore>()(
	immer((set) => ({
		students: null,
		hydrated: false,
		setAllStudents: async () => {
			try {
				const querySnapshot=await getDocs(collection(db, "students"))
				const students = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					uid: doc.id,
				}))as StudentWithId[];
				set({students})
			} catch (error) {
				console.log(error);
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
						error: new Error("StudentWithId ID already exists"),
					};
				}
				student.name = capitalizeWords(student.name);
				const docRef:DocumentReference=await addDoc(collection(db, "students"), {...student,
					createdAt: serverTimestamp(),});
				const docId:string=docRef.id
				student.uid=docId
				set((state) => {
					if (state.students) {
						state.students.push(student);
					} else {
						state.students = [student];
					}
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
				return {success:false,error:new Error("Cannot get uid!")}
			}
			try {
				await updateDoc(doc(db, "students", studentId), updatedStudent);
				set((state) => {
					if (state.students) {
						state.students = state.students.map((student) =>
							student.studentId === studentId
								? { ...student, ...updatedStudent }
								: student
						);
					}
				});
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},

		deleteStudent: async (studentId: string) => {
			if (!studentId) {
				return {success:false,error:new Error("Cannot get uid!")}
			}
			try {
				await deleteDoc(doc(db, "students", studentId));
				set((state) => {
					if (state.students) {
						state.students = state.students.filter(
							(student) => student.studentId !== studentId
						);
					}
				});
				return { success: true };
			} catch (error) {
				return { success: false, error: error as Error };
			}
		},
	}))
);

export const getStudentStore = () => studentStore.getState();
export {studentStore}