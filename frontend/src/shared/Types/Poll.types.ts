


export interface ChoicesData {
    id: number,
    choice_text: string,
    number_of_votes: number
}




export interface PollData{
    id:number,
    title:string,
    description:string,
    status:string,
    end_date:string,
    choices: ChoicesData[]
    created_at:string
}