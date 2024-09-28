import create from "zustand";
import { persist } from "zustand/middleware";

interface RouteStore {
  history: string[];
  addRoute: (route: string) => void;
  removeLastRoute: () => void; // New method to remove the last route
  resetHistory: () => void;
}

export const useRouteStore = create<RouteStore>()(
  persist(
    (set) => ({
      history: [],
      addRoute: (route) =>
        set((state) => {
          // Check if the history is empty or the current route is different from the last one
          if (
            state.history.length === 0 ||
            state.history[state.history.length - 1] !== route
          ) {
            return { history: [...state.history, route] };
          }
          return state; // Do not update the state if the current route is the same as the last one
        }),
      removeLastRoute: () => // New function to remove the last route
        set((state) => {
          if (state.history.length > 0) {
            return { history: state.history.slice(0, -1) }; // Remove the last route
          }
          return state; // Do nothing if the history is empty
        }),
      resetHistory: () => set({ history: [] }),
    }),
    {
      name: "route-history", // name of the item in the storage (must be unique)
    }
  )
);
