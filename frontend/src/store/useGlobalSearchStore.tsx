import {create} from 'zustand';
import { devtools } from 'zustand/middleware';

type GlobalSearchStore ={
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
}

export const useGlobalSearchStore = create<GlobalSearchStore>()(
  devtools((set) => ({
    globalSearchQuery: '',
    setGlobalSearchQuery: (query: string) => set({ globalSearchQuery: query }),
  }), { name: "GlobalStore" })
 
 
);


