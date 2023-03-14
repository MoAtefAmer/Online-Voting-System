import {create} from 'zustand';
import { devtools } from 'zustand/middleware';

type useStoreProps ={
  email: string;
  showModal:boolean,
  offset:number,
  searchQuery:string,
  choiceIdGlobal:number,
  pollIdGlobal:number,
  confirmOtpDisabled:boolean,
  notification:string,
  setNotification:(notif:string) =>void;
  setConfirmOtpDisabled:(confirmOtpDisabled:boolean) =>void;
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
    confirmOtpDisabled:true,
    notification:'',
    setNotification:(notif:string) =>set({notification:notif}),
    openModal:(open:boolean)=>set({showModal:open}),
    setEmail: (query: string) => set({ email: query }),
    setOffset:(number:number) =>set({offset:number}),
    setSearchQuery:(searchQuery:string) =>set({searchQuery:searchQuery}),
    setChoiceId:(choiceId:number) => set({choiceIdGlobal:choiceId}),
    setPollId:(pollId:number)=>set({pollIdGlobal:pollId}),
    setConfirmOtpDisabled:(confirmOtpDisabled:boolean) => set({confirmOtpDisabled:confirmOtpDisabled})
  }), { name: "GlobalStore" })
 
 
);


