import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { voteOnPolls } from '../../api/voteOnPoll';
import { useStore } from '../../store/useStore';
import { AxiosResponse, AxiosError } from 'axios';
import { useNotificationStore } from '../../store/useNotifcationStore';


interface ApiResponse {
  success: string;
  error: string;
}




export function Emailsubmission() {
  const [isDisabled, setIsDisabled] = useState(false);

  const { pollIdGlobal, choiceIdGlobal,setEmail,setConfirmOtpDisabled } = useStore();
  const { message, show, setShow, setMessage } = useNotificationStore();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      emailForm: '',
    },
  });

  function errorResponse(response: any): response is ApiResponse {
    return response  && response.error !== undefined
  }
  function successResponse(response: any): response is ApiResponse {
    return response  && response.success !== undefined
  }
  

  const mutation = useMutation(voteOnPolls, {
    onSuccess: (data) => {
      // Invalidate and refetch
      if (successResponse(data)) {
        console.log(data);
        setMessage(`Success! ${data.success}`);
        setShow(true);
      }
      // setNotification(data.data.response.message)
    },
    onError:(data:object)=>{
      if (errorResponse(data)) {
        console.log(data);
        setMessage(`Error! ${data.error}`);
        setShow(true);
      }
      // setNotification(data.data.response.message)
    }
  });

  const handleClick = async (email:string) => {
    setIsDisabled(true);
    setEmail(email)
    mutation.mutate({
      email: email,
      poll_id: pollIdGlobal,
      choice_id: choiceIdGlobal,
    });
    



   
    setTimeout(() => {
      setIsDisabled(false);
    }, 10000);
  };

  return (
    <section className='text-gray-400 bg-gray-900 body-font'>
      <form
        onSubmit={handleSubmit(async(data) => {
          console.log(data);
          setConfirmOtpDisabled(false)
          handleClick(data.emailForm);
        })}
      >
        <div className='container px-5 py-10 mx-auto'>
          <div className='flex flex-col text-center w-full mb-12'>
            <h1 className='sm:text-xl text-xl font-medium title-font mb-4 text-white'>
              Please enter your email
            </h1>
          </div>
          <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 
          sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'>
            <div className='relative sm:mb-0 flex-grow w-full'>
              <label className='leading-7 text-sm text-gray-400'>Email</label>
              <input
                {...register('emailForm', {
                  required: 'Email cannot be empty',
                  minLength: {
                    value: 2,
                    message: 'Min length is 2 characters',
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type='email'
                placeholder='johndoe@example.com'
                autoFocus
                className='w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700
                 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none
                  text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>

            <button
              disabled={isDisabled}
              type='submit'
              className={`text-white ${
                !isDisabled ? 'bg-blue-500' : 'bg-gray-700'
              }  ${
                !isDisabled ? 'hover:bg-indigo-600' : ''
              } border-0 py-2 px-8 focus:outline-none   rounded text-lg`}
            >
              Submit
            </button>
          </div>
          <span className='flex relative justify-center right-20 top-4 text-red-600'>
            {' '}
            {errors.emailForm?.message}
          </span>
        </div>
      </form>
    </section>
  );
}
