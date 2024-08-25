import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface CurtainAnimation {
	time: Date | null;
}
interface BlogAnimation {
	time: Date | null;
}
interface CoursesAnimation {
	time: Date | null;
}

interface AnimationStore {
	curtainAnimation: CurtainAnimation;
	coursesAnimation: CoursesAnimation;
	blogAnimation: BlogAnimation;
	hydrated: boolean;
	setHydrated(): void;
	setCurtainAnimationCompleted: () => void;
	setCoursesAnimationCompleted: () => void;
	setBlogAnimationCompleted: () => void;
}

const animationControl = create<AnimationStore>()(
	persist(
		immer((set) => ({
			curtainAnimation: { time: null },
			coursesAnimation: { time: null },
			blogAnimation: { time: null },
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
