import { useForm } from 'react-hook-form';
import { useStore } from '../../store/useStore';
import { useMutation } from 'react-query';
import {confirmVote} from '../../api'


export function Otpsubmission(queryClient:any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp:'',
    },
  });

  const { pollIdGlobal, choiceIdGlobal,email,confirmOtpDisabled,setConfirmOtpDisabled } = useStore();


  const mutation= useMutation(confirmVote, {
    onSuccess: (data) => {
      // Invalidate and refetch
      console.log(data);

      reset()
      setConfirmOtpDisabled(true)
      
    },
  });

  function handleClick(otp:string){

    const otpNumber = Number(otp);
    console.log("EMAIL",email);
    mutation.mutate({
        email: email,
        poll_id: pollIdGlobal,
        choice_id: choiceIdGlobal,
        otp: otpNumber
    });
 
     
   

  }

  return (
    <div className='relative bg-gray-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl'>
      <div className='mx-auto flex w-full max-w-md flex-col space-y-14'>
        <div className='flex flex-col items-center justify-center text-center space-y-2'>
          <div className='font-semibold text-xl text-gray-400'>
            <p>Confirm OTP</p>
          </div>
          <div className='flex flex-row text-sm font-medium text-gray-400'>
            <p>Enter the 6 Digit OTP sent to your email</p>
          </div>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(async (data) => {
              console.log(data);
              handleClick(data.otp)
            
            })}
          >
            <div className='flex flex-col space-y-6'>
              <div className='flex flex-row items-center  min justify-center mx-auto w-full max-w-sm '>
                <input
                  {...register('otp', {
                    pattern: /^[0-9]+$/,
                    required: 'Otp Field cannot be empty',
               
                    maxLength:{
                        value:6,
                        message:"Otp should be 6 numbers"
                    }
                  })}
                  maxLength={6}
             
                
                  placeholder='123456'
              
                  className='w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                />
                
              </div>
              <p className='text-red-500 flex justify-center'>  {errors.otp?.message}</p>
             
              <div className='flex flex-col space-y-5'>
                <div>
                  <button disabled={confirmOtpDisabled} className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 ${confirmOtpDisabled? 'bg-gray-700':'bg-blue-700'}  border-none text-white text-sm shadow-sm`}>
                    Confirm Vote
                  </button>
                </div>
          
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
