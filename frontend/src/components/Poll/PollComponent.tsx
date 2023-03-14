import { Choicecard } from './Choicecard';

import { ChoicesData, PollData } from '../../shared/Types';

export function PollComponent({
  id,
  title,
  created_at,
  description,
  choices,
  end_date,
  status,
}: PollData) {
  const date = new Date(end_date);
  const formattedDate = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(',', '');

  const formattedTime = date
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: 'numeric',
    })
    .replace(',', '');

  return (
    <div className='py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap'>
      <div className='md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col'>
        {status == 'inProgress' ? (
          <span
            className='font-semibold title-font text-green-500 
                 sm:py-0.5 w-1/2  text-center rounded-full'
          >
            {status.toLocaleUpperCase()}
          </span>
        ) : (
          <span
            className='font-semibold title-font
                 
                  text-red-500  sm:py-0.5 w-1/2  text-center rounded-full'
          >
            {status.toUpperCase()}
          </span>
        )}

        <span className='mt-1 text-gray-500 text-sm relative top-2 left-6'>
          {formattedDate}
          <p className='top-2 relative'>{formattedTime}</p>
        </span>
      </div>
      <div className='md:flex-grow'>
        <h2 className='text-2xl font-medium text-white title-font mb-2'>
          {title}
        </h2>
        <p className='leading-relaxed'>{description}</p>
        <div className='flex flex-wrap relative right-4'>
          {choices &&
            choices.map(({ id, choice_text, number_of_votes }: ChoicesData) => (
              <div key={id} className='w-1/2 md:w-1/3 lg:w-1/4 p-4'>
                <Choicecard
                  key={id}
                  choiceId={id}
                  choice_text={choice_text}
                  number_of_votes={number_of_votes}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
