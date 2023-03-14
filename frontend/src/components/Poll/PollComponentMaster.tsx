import React, { useContext, useEffect, useState } from 'react';
import { getPolls } from '../../api/getPolls';
import { useQuery, useQueryClient } from 'react-query';
import { PollComponent } from './PollComponent';
import { PollData } from '../../shared/Types';
import { Paginator } from '../Pagination';
import { Searchbar } from '../Header';
import { useStore } from '../../store/useStore';

interface PollComponentMasterProps{
  queryClient:any
}
// Normally I wouldnt manage app data this way but im running out of time
export function PollComponentMaster({queryClient}:PollComponentMasterProps) {


  const {searchQuery, setSearchQuery} = useStore();

  const [limit, setLimit] = useState(10);
  const {offset,setOffset} = useStore()
  // const [offset, setOffset] = useState(0);


  const {
    isLoading,
    isError,
    data,
    

  } =  useQuery(
    ['polls', offset,searchQuery],
    () => getPolls({ limit: limit, offset: offset,searchQuery:searchQuery }),
    { keepPreviousData: true, staleTime: 1000 * 60 }
  );

  const handleSearch = (query:string) => {
    setOffset(0)
    setSearchQuery(query);
    queryClient.invalidateQueries('polls');
    
  };

  function handlePageChange(newPageNumber: number) {
    setOffset((newPageNumber - 1) * 10);

  }

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  if (isError) {
 
    return <div> is Error  </div>;
  }

  
  return (
    <div>
      <Searchbar handleSearch={handleSearch}/>
      <div className='container px-5 py-24 mx-auto'>
        <div className='-my-8 divide-y-2 divide-gray-800'>
          {data &&
            data.data.results.map(
              ({
                id,
                title,
                description,
                created_at,
                choices,
                end_date,
                status,
              }: PollData) => (
                <PollComponent
                  key={id}
                  title={title}
                  id={id}
                  description={description}
                  status={status}
                  end_date={end_date}
                  choices={choices}
                  created_at={created_at}
                />
              )
            )}
        </div>
      </div>
      <Paginator
        numberOfPages={data && data.data.count}
        limit={limit}
        offset={offset}
        next={data && data.data.next}
        previous={data && data.data.previous}
        onClick={handlePageChange}
      />
    </div>
  );
}
