import {create} from 'zustand';
import { devtools } from 'zustand/middleware';

type useStoreProps ={
  email: string;
  showModal:boolean,
  offset:number,
  searchQuery:string,
  choiceIdGlobal:number,
  pollIdGlobal:number,
  setEmail: (query: string) => void;
  setOffset:(number:number) =>void;
  setSearchQuery:(search:string) =>void;
  setChoiceId:(choiceId:number)=>void;
  setPollId:(pollId:number)=>void;
  openModal:(open:boolean)=>void;
}

export const useStore = create<useStoreProps>()(
  devtools((set) => ({
    email: '',
    showModal:false,
    offset:0,
    searchQuery:'',
    pollIdGlobal:0,
    choiceIdGlobal:0,
    openModal:(open:boolean)=>set({showModal:open}),
    setEmail: (query: string) => set({ email: query }),
    setOffset:(number:number) =>set({offset:number}),
    setSearchQuery:(searchQuery:string) =>set({searchQuery:searchQuery}),
    setChoiceId:(choiceId:number) => set({choiceIdGlobal:choiceId}),
    setPollId:(pollId:number)=>set({pollIdGlobal:pollId}),
  }), { name: "GlobalStore" })
 
 
);


