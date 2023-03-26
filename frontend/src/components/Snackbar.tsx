import { Toast } from 'flowbite-react';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';
import { useNotificationStore } from '../store/useNotifcationStore';

export function Snackbar() {
  const { message, show, setShow, setMessage } = useNotificationStore();


  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 5000); // 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [show, setShow]);

  return (
    <div
      className={` bottom-0 w-1/2  fixed left-1/2 -translate-x-1/2  p-4 transform transition-all duration-1000 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className='bg-gray-800 rounded-lg shadow-lg p-4'>
        <p className='text-white'>{message}</p>
      </div>
    </div>
  );

}
