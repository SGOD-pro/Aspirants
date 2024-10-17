import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { Student } from "@/schema/StudentSchema";
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
	orderBy,
	limit,
} from "firebase/firestore";
import { capitalizeWords } from "@/lib/Capitalize";

export interface StudentWithId extends Student {
	uid: string;
	status?: boolean;
	createdAt?: Date;
}

interface StudentStore {
	students: StudentWithId[] | null;
	totalStudents: number;
	lastAdmission: string | null;
	hydrated: boolean;
	setTotalStudents(): Promise<{ success: boolean; error?: Error }>;
	setLastAdmission(): Promise<{ success: boolean; error?: Error }>;
	addStudent(student: Student): Promise<{ success: boolean; error?: Error }>;
	setAllStudents(): Promise<{ success: boolean; error?: Error }>;
	updateStudent(
		studentId: string,
		updatedStudent: Partial<StudentWithId>
	): Promise<{ success: boolean; error?: Error }>;
	deleteStudent(
		studentId: string
	): Promise<{ success: boolean; error?: Error }>;
}

const studentStore = create<StudentStore>()(
	persist(
		immer((set, get) => ({
			students: null,
			hydrated: false,
			totalStudents: 0,
			lastAdmission: null,

			setAllStudents: async () => {
				if (get().students) {
					return { success: true };
				}
				console.log("fetching students...");
				try {
					const querySnapshot = await getDocs(collection(db, "students"));
					const students = querySnapshot.docs.map((doc) => ({
						...doc.data(),
						uid: doc.id,
						admissionDate: doc.data().admissionDate.toDate(),
					})) as StudentWithId[];
					set({ students, hydrated: true });
					return { success: true };
				} catch (error) {
					console.error("Error fetching students:", error);
					return { success: false, error: error as Error };
				}
			},
			setLastAdmission: async () => {
				try {
					const colRef = collection(db, "students");
					const q = query(colRef, orderBy("admissionDate", "desc"), limit(1));
					const querySnapshot = await getDocs(q);

					if (!querySnapshot.empty) {
						const latestDoc = querySnapshot.docs[0].data();
						const lastAdmission = latestDoc.admissionDate
							.toDate()
							.toISOString();

						set({ lastAdmission });
					} else {
						set({ lastAdmission: null });
					}
					return { success: true };
				} catch (error) {
					console.error("Error fetching last admission date:", error);
					return { success: false, error: error as Error };
				}
			},

			setTotalStudents: async () => {
				try {
					const colRef = collection(db, "students");
					const querySnapshot = await getDocs(colRef);
					const totalStudents = querySnapshot.size;

					set({ totalStudents });
					return { success: true };
				} catch (error) {
					console.error("Error fetching total number of students:", error);
					return { success: false, error: error as Error };
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

					// Update total students and last admission
					await get().setTotalStudents();
					await get().setLastAdmission();

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
					set((state) => ({
						students:
							state.students?.map((student) =>
								student.uid === studentId ? { ...student, ...updatedStudent } : student
							) || null,
					}));
					console.log("updated",get().students);
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

					// Update total students after deletion
					await get().setTotalStudents();

					return { success: true };
				} catch (error) {
					return { success: false, error: error as Error };
				}
			},
		})),
		{
			name: "student-store",
			partialize: (state) => ({
				totalStudents: state.totalStudents,
				lastAdmission: state.lastAdmission,
			}),
		}
	)
);

export const getStudentStore = () => studentStore.getState();
export { studentStore };
