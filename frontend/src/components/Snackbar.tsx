import { Toast } from 'flowbite-react';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

export function Snackbar() {
  const { notification,setNotification } = useStore();
  // const [isVisible, setIsVisible] = useState(false);
  console.log(notification.length);

  useEffect(()=>{

    setTimeout(() => {
      setNotification('')
  }, 3000);

  },[notification])


  return (
    <div
      className={`fixed bottom-0 w-full p-4 transform transition-all duration-1000 ${
        notification ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4">
        <p className="text-gray-800">Global state has changed!</p>
      </div>
    </div>
  );
  // return (
  //   <div
  //     id='toast-default'
  //     className='flex items-center w-full max-w-xl p-4  rounded-lg shadow text-gray-400 bg-gray-800'
  //     role='alert'
  //   >
  //     <div className='ml-3 text-sm font-normal '>
  //       {notification.length === 0 ? '' : notification}
  //     </div>
  //   </div>
  // );
}
