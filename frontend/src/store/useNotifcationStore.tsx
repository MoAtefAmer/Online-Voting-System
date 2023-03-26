import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type NotificationState = {
  message: string | null;
  show: boolean;
  setShow: (show: boolean) => void;
  setMessage: (message: string) => void;
};

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set) => ({
      message: null,
      show: false,
      setShow: (show: boolean) => set({ show }),
      setMessage: (message: string) => set({ message }),
    }),
    { name: 'NotificationStore' }
  )
);
