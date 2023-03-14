import React, { useEffect, useState } from 'react';
import { getPolls } from '../../api/getPolls';
import { useQuery, useQueryClient } from 'react-query';
import { PollComponent } from './PollComponent';
import { PollData } from '../../shared/Types';
import { Paginator } from '../Pagination';

export function PollComponentMaster() {



  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery(
    ['polls', offset],
    () => getPolls({ limit: limit, offset: offset }),
    { keepPreviousData: true, staleTime: 1000*30}
  );

  function handlePageChange(newPageNumber: number) {
    setOffset((newPageNumber - 1) * 10);

    // refetch();
  }

  if (isLoading) {
    return <div>Loading ....</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  return (
    <div>
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