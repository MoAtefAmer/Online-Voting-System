import { useState } from "react"
import { useStore } from "../../store/useStore"


interface ChoicecardProps{
  choiceId:number,
  choice_text:string,
  number_of_votes:number,
  pollId:number
}

export  function Choicecard({choiceId,choice_text,number_of_votes,pollId}:ChoicecardProps) {

  const {setChoiceId,setPollId,openModal,showModal} = useStore()
  const [open,setOpen] = useState(false)
  function onClick(){
    setChoiceId(choiceId)
    setPollId(pollId)
    openModal(true)
    console.log(pollId,'pollId');
    console.log(choiceId,'choiceId');
    console.log('show modal',showModal);
  }


  return (
    <div className="bg-gray-800 rounded flex p-3 min-w-fit h-full items-center">
      
          <button onClick={onClick} className="justify-between flex flex-auto hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
          <div className=" title-font font-medium text-white">{choice_text}</div>
          <div className="text-sm">{number_of_votes} votes</div>
            </button>  
        
        </div>
  )
}
