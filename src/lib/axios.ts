import Axios, { AxiosRequestConfig, AxiosResponse } from "axios-jsonp-pro";
import { camelizeKeys } from "humps";

import { API_KEY, BASE_URL } from "@/config";

export const axios = Axios.create({
  baseURL: BASE_URL,
});

const requestInterceptor = (config: AxiosRequestConfig) => {
  config.params.api_key = API_KEY;

  return config;
};

const responseInterceptor = (response: AxiosResponse) => {
  return camelizeKeys(response) as AxiosResponse<any>;
};

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(responseInterceptor);
