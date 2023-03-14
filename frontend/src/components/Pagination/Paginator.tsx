import { Leftnavbutton } from './Leftnavbutton';
import { Pagenumber } from './Pagenumber';
import { Rightnavbutton } from './Rightnavbutton';



// function AnotherComponent() {

//   // Render the data...
// }

interface PaginatorProps {
  numberOfPages: number;
  limit: number ;
  offset: number ;
  next: string | null;
  previous: string | null;
  onClick?: (newPageNumber:number) => void;
}
export function Paginator({
  numberOfPages,
  limit,
  offset,
  next,
  previous,
  onClick
}: PaginatorProps) {


  function calculatePages(count: number, limit: any, offset: any) {
    const totalItems = count - offset;
    const totalPages = Math.ceil(totalItems / limit);
    return totalPages;
  }


  const items = Array.from(
    { length: calculatePages(numberOfPages, limit, offset) },
    (_, index) => index + 1
  );

  return (
    <div className='container mx-auto flex justify-center flex-wrap p-5 flex-col md:flex-row  items-center'>
      <nav aria-label='Page navigator'>
        <ul className='inline-flex  -space-x-px'>
          {/* {previous && <Leftnavbutton />} */}

          {items.map((item, i) => (
            <Pagenumber onClick={onClick} key={i} number={i + 1} currentPage={offset && offset*10}/>
          ))}

          {/* {next && <Rightnavbutton />} */}
        </ul>
      </nav>
    </div>
  );
}
