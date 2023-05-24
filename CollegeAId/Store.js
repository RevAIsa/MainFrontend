import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist((set) => ({
  userId: '',
  setUserId: (id) => set(() => ({ userId: id })),
}), {
  name: 'light-user-storage', 
}));

export default useStore;

