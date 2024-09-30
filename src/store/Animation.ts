import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AnimationStore {
	curtainAnimation: Animations;
	coursesAnimation: Animations;
	blogAnimation: Animations;
	navItemsAnimation: boolean;
	hydrated: boolean;
	setHydrated(): void;
	setCurtainAnimationCompleted: () => void;
	setCoursesAnimationCompleted: () => void;
	setBlogAnimationCompleted: () => void;
	setNavItemsAnimation: () => void;
}

const animationControl = create<AnimationStore>()(
	persist(
		immer((set) => ({
			curtainAnimation: { time: null },
			coursesAnimation: { time: null },
			blogAnimation: { time: null },
			navItemsAnimation: false,
			hydrated: false,
			setHydrated() {
				set({ hydrated: true });
			},
			setCurtainAnimationCompleted: () => {
				const time = new Date();
				time.setHours(time.getHours() + 24);
				console.log(time);
				console.log(new Date());

				set((state) => {
					state.curtainAnimation.time = time;
				});
			},
			setNavItemsAnimation:()=>{
				set((state) => {
					state.navItemsAnimation = true;
				});
			},
			setCoursesAnimationCompleted: () => {
				const time = new Date();
				time.setHours(time.getHours() + 24);
				set((state) => {
					state.coursesAnimation.time = time;
				});
			},

			setBlogAnimationCompleted: () => {
				const time = new Date();
				time.setHours(time.getHours() + 24);
				set((state) => {
					state.blogAnimation.time = time;
				});
			},
		})),
		{
			name: "animation-control",
			partialize: (state) => ({
				curtainAnimation: state.curtainAnimation,
				coursesAnimation: state.coursesAnimation,
				blogAnimation: state.blogAnimation,
				hydrated: state.hydrated,
			}),
			onRehydrateStorage() {
				return (state, error) => {
					if (!error) state?.setHydrated();
				};
			},
		}
	)
);

const getAnimationControlStore = () => animationControl.getState();
export {animationControl}
export default getAnimationControlStore;