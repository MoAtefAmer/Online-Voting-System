import axios, { Method, AxiosRequestConfig, AxiosResponse } from 'axios';

interface httpServiceProps {
  method: Method,
  url: string,
  data?: any,
  headers?: any,
  params?: any
}

export const httpService = async (
  { method, url, data, headers, params }: httpServiceProps
): Promise<AxiosResponse> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      data,
      headers,
      params,
    };
    const response = await axios(requestConfig);
    return response;
  } catch (error) {
    throw error;
  }
};


