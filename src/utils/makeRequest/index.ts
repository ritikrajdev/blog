import axios, { AxiosRequestConfig } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import {
  ERROR_PAGE_ROUTE,
  ERROR_WITH_STATUS_PAGE_ROUTE,
} from '../../constants/routes';

import { ApiEndpoint } from '../../types/apiEndpoint';

export async function makeRequest(
  apiEndpoint: ApiEndpoint,
  axiosRequestConfig: AxiosRequestConfig = {},
  navigate?: NavigateFunction,
) {
  try {
    const response = await axios({
      ...axiosRequestConfig,
      ...apiEndpoint,
    });
    return response.data;
  } catch (err: any) {
    if (navigate) {
      const errorStatus = err?.response?.status;
      navigate(
        errorStatus
          ? ERROR_WITH_STATUS_PAGE_ROUTE(errorStatus)
          : ERROR_PAGE_ROUTE,
      );
    } else {
      throw err;
    }
  }
}
