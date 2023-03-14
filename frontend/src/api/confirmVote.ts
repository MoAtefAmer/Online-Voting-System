import axios,{ AxiosResponse } from 'axios';
import { httpService } from './../shared/middleware/Http.service';

// TODO: put this in an env file
const apiEndpoint = 'http://127.0.0.1:8000/api/';

interface confirmVoteProps {
  poll_id:number,
  email:string,
  choice_id:number,
  otp:number,
}

export async function confirmVote({ poll_id,email,choice_id,otp }: confirmVoteProps) {
  try {
    const data = await httpService({
      method: 'POST',
      url: `${apiEndpoint}confirm_vote`,
      data:{
        poll_id:poll_id,
        email:email,
        choice_id:choice_id,
        otp:otp
      }
      

    });

    
    return data;
  } catch (error) {
      console.log(error);
    throw { error: error?.response?.data.error };
  }
}


