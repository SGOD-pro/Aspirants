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
	role: "normal" | "admin" | "student" | null;
}

interface AdminAuth {
	user: any | null;
	userPrefs: UserPrefs | null;
	isCreatingAccount: boolean;
	hydrated: boolean;
	setHydrated(): void;
	verifySession(): Promise<void>;
	login(
		email: string,
		password: string
	): Promise<{ success: boolean; error?: Error; userPrefs?: UserPrefs }>;
	createAccount(
		email: string,
		password: string
	): Promise<{ success: boolean; error?: Error; userPrefs?: UserPrefs }>;
	logout(): Promise<{ success: boolean; error?: Error }>;
	signInWithGoogle(): Promise<{
		success: boolean;
		error?: Error;
		userPrefs?: UserPrefs;
	}>;
}

export const useAuthStore = create<AdminAuth>()(
	persist(
		immer((set, get) => ({
			user: null,
			userPrefs: null,
			hydrated: false,
			isCreatingAccount: false,
			setHydrated() {
				set({ hydrated: true });
			},

			async verifySession() {
				if (get().isCreatingAccount) {
					console.log(
						"Skipping session verification as account is being created"
					);
					return;
				}
				return new Promise<void>((resolve) => {
					const unsubscribe = onAuthStateChanged(auth, async (user) => {
						if (user) {
							const userDocRef = doc(db, "users", user.uid);
							const userDoc = await getDoc(userDocRef);

							if (userDoc.exists()) {
								const userPrefs = userDoc.data() as UserPrefs;
								set({ user, userPrefs });

								console.log("User verified session:", user, userPrefs);

								// Check if the user is not verified
								if (!userPrefs.isVerified && !get().isCreatingAccount) {
									console.log("User not verified, logging out...");
									set({ user: null, userPrefs: null });
									await get().logout(); // Make sure to await logout
								}
							} else {
								console.log("No user document found in Firestore");
								set({ user: null, userPrefs: null });
							}
						} else {
							console.log("No authenticated user found");
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
					set({ isCreatingAccount: true });
					console.log("Setting isCreatingAccount to true");

					// Create the user with email and password
					const userCredential = await createUserWithEmailAndPassword(
						auth,
						email,
						password
					);
					const user = userCredential.user;

					console.log("Account created, user:", user);

					// Set up the user document in Firestore
					await setDoc(doc(db, "users", user.uid), {
						isVerified: false,
						role: null,
					} as UserPrefs);
					console.log("User document set in Firestore");

					// Send OTP email
					console.log("Sending OTP to email:", email);
					const response = await fetch("/api/send-otp", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, uid: user.uid }),
					});

					if (!response.ok) {
						console.error("Failed to send OTP email");
						return {
							success: false,
							error: new Error("Error sending verification email"),
						};
					}
					console.log("OTP email sent");

					// Update state after the account creation and OTP sending
					set({ user, userPrefs: { isVerified: false, role: "normal" } });
					get().setHydrated();
					console.log("User state updated in store");

					set({ isCreatingAccount: false });
					console.log("Account creation flow complete");
					return { success: true, user };
				} catch (error: any) {
					console.error("Error in createAccount:", error);
					set({ isCreatingAccount: false }); // Reset in case of failure
					return { success: false, error: error as Error };
				}
			},

			async login(email: string, password: string) {
				try {
					const userCredential = await signInWithEmailAndPassword(
						auth,
						email,
						password
					);
					console.log("user login");
					const user = userCredential.user;
					const userDocRef = doc(db, "users", user.uid);
					const userDoc = await getDoc(userDocRef);
					const data = userDoc.data();
					console.log(data);
					if (!data?.isVerified) {
						await signOut(auth);
						return {
							success: false,
							error: new Error("User not verified"),
							isVerified: false,
						};
					}
					console.log({ user, userPrefs: data });
					set({ user, userPrefs: data as UserPrefs });
					get().setHydrated();
					return { success: true, userPrefs: data as UserPrefs };
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
							role: "normal",
						} as UserPrefs);
						set({ user, userPrefs: { isVerified: true, role: "normal" } });
					} else {
						set({ user, userPrefs: userDoc.data() as UserPrefs });
					}
					return { success: true, role: userDoc.data()?.role || "normal" };
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
