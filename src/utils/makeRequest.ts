import axios, { AxiosRequestConfig } from 'axios';
import { ApiEndpoint } from '../types/apiEndpoint';

export async function makeRequest(
  apiEndpoint: ApiEndpoint,
  axiosRequestConfig: AxiosRequestConfig = {},
) {
  const response = await axios({
    ...axiosRequestConfig,
    ...apiEndpoint,
  });
  return response.data;
}
