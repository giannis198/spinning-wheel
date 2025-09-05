
import { create } from 'zustand';

interface StoreState {
   segments: string[];
  result: string | null;
  showConfetti: boolean;
  addSegment: (segment: string) => void;
  removeSegment: (segment: string) => void;
  updateSegment: (oldSegment: string, newSegment: string) => void;
  setResult: (result: string | null) => void;
  setShowConfetti: (show: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
    segments: [
    "ΘΕΡΜΟ",
    "USB",
    "ΑΚΟΥΣΤΙΚΑ",
    "HUB",
    "ΦΑΚΟ UV",
    "POWERBANK",
    "ΣΗΜΕΙΩΜΑΤΑΡΙΟ",
  ],
  result: null,
  showConfetti: false,
  addSegment: (segment) => set((state) => ({ segments: [...state.segments, segment] })),
  removeSegment: (segment) =>
    set((state) => ({ segments: state.segments.filter((s) => s !== segment) })),
  updateSegment: (oldSegment, newSegment) =>
    set((state) => ({
      segments: state.segments.map((s) => (s === oldSegment ? newSegment : s)),
    })),
  setResult: (result) => set({ result }),
  setShowConfetti: (show) => set({ showConfetti: show }),
}));
