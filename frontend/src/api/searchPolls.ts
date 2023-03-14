import axios,{ AxiosResponse } from 'axios';
import { httpService } from './../shared/middleware/Http.service';

// TODO: put this in an env file
const apiEndpoint = 'http://127.0.0.1:8000/api/';

interface searchPollsProps {
 searchQuery:string
}

export async function searchPolls({ searchQuery }: searchPollsProps) {
  try {
    const data = await httpService({
      method: 'GET',
      url: `${apiEndpoint}polls/`,
      params: { search:searchQuery },
    });
    return data;
  } catch (error) {
    throw { error: error };
  }
}


