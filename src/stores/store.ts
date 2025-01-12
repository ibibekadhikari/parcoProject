import { create } from "zustand";

type cellState = {
  activePieCell: number;
  setActivePieCell: (holding: number) => void;
};

export const useCellPieStore = create<cellState>((set) => ({
  activePieCell: 0,
  setActivePieCell: (cellPie: number) => set({ activePieCell: cellPie }),
}));
