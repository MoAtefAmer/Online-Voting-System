

interface ChoicecardProps{
  choiceId:number,
  choice_text:string,
  number_of_votes:number
}

export  function Choicecard({choiceId,choice_text,number_of_votes}:ChoicecardProps) {
  return (
    <div className="bg-gray-800 rounded flex p-3 min-w-fit h-full items-center">
      
          <button className="justify-between flex flex-auto hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
          <div className=" title-font font-medium text-white">{choice_text}</div>
          <div className="text-sm">{number_of_votes} votes</div>
            </button>  
        
        </div>
  )
}
