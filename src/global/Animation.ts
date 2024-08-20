import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AnimationStore {
	curtainAnimation: boolean;
	setCurtainAnimation: (animation: boolean) => void;
}

const animationControl = create<AnimationStore>()(
	immer((set) => ({
		curtainAnimation: false,
		setCurtainAnimation: (animation: boolean) => {
			set({ curtainAnimation: animation });
		},
	}))
);

const getAnimationColtrolStore = () => animationControl.getState();
export default getAnimationColtrolStore;
