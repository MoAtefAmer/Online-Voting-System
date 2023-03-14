import axios,{ AxiosError, AxiosResponse } from 'axios';
import { httpService } from './../shared/middleware/Http.service';

// TODO: put this in an env file
const apiEndpoint = 'http://127.0.0.1:8000/api/';

interface voteOnPollsProps {
  poll_id:number,
  email:string,
  choice_id:number,
}

export async function voteOnPolls({ poll_id,email,choice_id }: voteOnPollsProps) {
  try {
    const data = await httpService({
      method: 'POST',
      url: `${apiEndpoint}vote_on_polls`,
      data:{
        poll_id,
        email,
        choice_id
      }
      

    });

    
    return data.data;
  } catch (error:any) {
      console.log(error);
    // throw { error: error.response.data.error };
  }
}


