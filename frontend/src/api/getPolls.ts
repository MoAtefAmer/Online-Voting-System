import axios,{ AxiosResponse } from 'axios';
import { httpService } from './../shared/middleware/Http.service';

// TODO: put this in an env file
const apiEndpoint = 'http://127.0.0.1:8000/api/';

interface getPollsProps {
  limit?: number | unknown;
  offset?: number |unknown;
}

export async function getPolls({ limit, offset }: getPollsProps) {
  try {
    const data = await httpService({
      method: 'GET',
      url: `${apiEndpoint}polls/`,
      params: { limit: limit, offset: offset },
    });
    return data;
  } catch (error) {
    throw { error: error };
  }
}


