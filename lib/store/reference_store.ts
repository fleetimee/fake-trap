import { create } from "zustand"





interface BearState {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
  bearsWith: (val: number) => void
}

export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  bearsWith: (val: number) => set({ bears: val }),
}))
