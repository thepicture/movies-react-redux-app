import Axios, { AxiosRequestConfig } from "axios";

import { API_KEY, BASE_URL } from "@/config";

console.log(BASE_URL);

export const axios = Axios.create({
  baseURL: BASE_URL,
});

const requestInterceptor = (config: AxiosRequestConfig) => {
  config.params.api_key = API_KEY;

  return config;
};

axios.interceptors.request.use(requestInterceptor);
