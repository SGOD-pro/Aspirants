import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { auth, db } from "@/config/client";
import {
	doc,
	getDoc,
	setDoc,
	query,
	collection,
	where,
	getDocs,
} from "firebase/firestore";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

export interface UserPrefs {
	isAdmin?: boolean;
	isStudent?: boolean;
	isVerified?: boolean;
}

interface AdminAuth {
	user: any | null;
	userPrefs: UserPrefs | null;
	hydrated: boolean;
	setHydrated(): void;
	verifySession(): Promise<void>;
	login(
		email: string,
		password: string,
		isStudent: boolean
	): Promise<{ success: boolean; error?: Error; isVerified?: boolean }>;
	createAccount(
		email: string,
		password: string
	): Promise<{ success: boolean; error?: Error; isVerified?: boolean }>;
	logout(): Promise<{ success: boolean; error?: Error }>;
	signInWithGoogle(): Promise<{ success: boolean; error?: Error }>;
}

export const useAuthStore = create<AdminAuth>()(
	persist(
		immer((set) => ({
			user: null,
			userPrefs: null,
			hydrated: false,

			setHydrated() {
				set({ hydrated: true });
			},

			async verifySession() {
				return new Promise<void>((resolve) => {
					const unsubscribe = onAuthStateChanged(auth, async (user) => {
						if (user) {
							const userDocRef = doc(db, "users", user.uid);
							const userDoc = await getDoc(userDocRef);
							if (userDoc.exists()) {
								set({ user, userPrefs: userDoc.data() as UserPrefs });
								if (userDoc.data()?.isAdmin) {
									set({ user: null, userPrefs: null });
								}
								console.log(userDoc.data());
							} else {
								set({ user, userPrefs: null });
							}
						} else {
							console.log("no user");
							set({ user: null, userPrefs: null });
						}
						set({ hydrated: true });
						resolve();
					});

					return () => unsubscribe();
				});
			},

			async createAccount(email: string, password: string) {
				try {
					const userCredential = await createUserWithEmailAndPassword(
						auth,
						email,
						password
					);
					const user = userCredential.user;

					await setDoc(doc(db, "users", user.uid), {
						isVerified: false,
					} as UserPrefs);

					const response = await fetch("/api/send-otp", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, uid: user.uid }),
					});
					if (response.status > 200) {
						return {
							success: false,
							error: new Error("Error sending verification email"),
						};
					}

					set({ user, userPrefs: { isVerified: false } });

					return { success: true, user };
				} catch (error: any) {
					// Handle errors, such as if the user already exists
					if (error.code === "auth/email-already-in-use") {
						return {
							success: false,
							error: new Error("User already exists"),
						};
					}
					return { success: false, error: error as Error };
				}
			},

			async login(email: string, password: string, isStudent: boolean) {
				try {
					const userCredential = await signInWithEmailAndPassword(
						auth,
						email,
						password
					);
					const user = userCredential.user;
					const userDocRef = doc(db, "users", user.uid);
					const userDoc = await getDoc(userDocRef);
					const data = userDoc.data();

					if (!data?.isVerified) {
						return {
							success: false,
							error: new Error("User not verified"),
							isVerified: false,
						};
					}

					set({ user, userPrefs: data });
					return { success: true };
				} catch (error) {
					console.log(error);
					return { success: false, error: error as Error };
				}
			},

			async signInWithGoogle() {
				const provider = new GoogleAuthProvider();
				try {
					const result = await signInWithPopup(auth, provider);
					const user = result.user;
					const userDocRef = doc(db, "users", user.uid);
					const userDoc = await getDoc(userDocRef);
					if (!userDoc.exists()) {
						await setDoc(doc(db, "users", user.uid), {
							isVerified: true,
						} as UserPrefs);
						set({ user, userPrefs: { isVerified: true } });
					} else {
						set({ user, userPrefs: userDoc.data() });
					}
					return { success: true };
				} catch (error) {
					console.error("Error during Google Sign-In:", error);
					return { success: false, error: error as Error };
				}
			},

			async logout() {
				try {
					await signOut(auth);
					set({ user: null, userPrefs: null });

					return { success: true };
					console.log("logged out");
				} catch (error) {
					console.log(error);
					return { success: false, error: error as Error };
				}
			},
		})),
		{
			name: "auth",
			onRehydrateStorage() {
				return (state, error) => {
					if (!error) state?.setHydrated();
				};
			},
		}
	)
);

export const getAuthState = () => useAuthStore.getState();
