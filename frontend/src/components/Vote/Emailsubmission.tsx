import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function Emailsubmission() {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      emailForm: '',
    },
  });

  return (
    <section className='text-gray-400 bg-gray-900 body-font'>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          handleClick();
        })}
      >
        <div className='container px-5 py-10 mx-auto'>
          <div className='flex flex-col text-center w-full mb-12'>
            <h1 className='sm:text-xl text-xl font-medium title-font mb-4 text-white'>
              Please enter your email
            </h1>
          </div>
          <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'>
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
                className='w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
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
