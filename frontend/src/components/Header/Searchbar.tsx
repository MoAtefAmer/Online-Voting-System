import { useForm, } from 'react-hook-form';
import { Searchicon } from './Searchicon';



interface SearchbarProps {
  handleSearch: (query: string) => void;
}

export function Searchbar({ handleSearch }: SearchbarProps) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      searchBar: '',
    },
  });


  return (
    <div>
      <form
        onSubmit={handleSubmit((data)=>{    
          console.log(data);
          handleSearch(data.searchBar)

        })}
        
      >
        <div className='relative flex m-2 items-center justify-center' >
          <Searchicon />
          <input
          
            {...register('searchBar', {
              required: 'Search bar cannot be empty',
              minLength: {
                value: 2,
                message: 'Min length is 2 characters',
              },
            pattern: {
              value: /^[a-zA-Z0-9 ]*$/, // allow only letters, numbers, and spaces
              message: 'Special characters are not allowed',
            },
          
          })}
            autoFocus
            type='search'
    
            className='block w-1/2 p-4 pl-10 text-sm 
                     border  rounded-lg 
                      bg-gray-700 
                    border-gray-600 placeholder-gray-400 
                    text-white focus:ring-blue-500 
                    focus:border-blue-500'
            placeholder='Search Polls, Titles, Choices...'
          />

          <button
            type='submit'
            className='text-white relative md:right-20 right-16  focus:ring-4 focus:outline-none 
                         font-medium rounded-lg
                            px-2 py-2
                         text-sm md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
          >
            Search
          </button>
        </div>
        <p className='justify-center flex text-red-500'>
          {errors.searchBar?.message}
        </p>
      </form>
    </div>
  );
}
