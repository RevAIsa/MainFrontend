import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist((set) => ({
  userId: '',
  setUserId: (id) => set(() => ({ userId: id })),
  selectedSuggestion: null,
  setSelectedSuggestion: (suggesstion) => set({ selectedSuggestion: suggesstion })
}), {
  name: 'light-user-storage', 
}));

export default useStore;

