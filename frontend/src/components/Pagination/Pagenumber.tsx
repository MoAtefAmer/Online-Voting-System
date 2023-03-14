import { useQuery, useQueryClient } from 'react-query';
import { getPolls } from '../../api';

interface PageNumberProps {
  number: number;
  currentPage: number;
  onClick?: (newPageNumber: number) => void;
}

export function Pagenumber({ number, onClick, currentPage }: PageNumberProps) {

  function handleClick(newPageNumber: number) {
    onClick && onClick(newPageNumber);
  }

  return (
    <div>
      <li>
        <span
          onClick={(e) => {
            e.preventDefault()
            handleClick(number);
          }}
          className={`px-3 py-2 leading-tight  border 
                  ${
                    currentPage + 1 === number ? 'bg-blue-800' : 'bg-gray-800'
                  } border-gray-700  text-gray-400 hover:bg-gray-700 hover:text-white hover:cursor-pointer`}
        >
          {number}
        </span>
      </li>
    </div>
  );
}
