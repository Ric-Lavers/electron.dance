import Axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
// import { redirectToLogin } from './utils';

export const createAxios = (
  baseURL: string,
  options: AxiosRequestConfig<any> & { rawData?: boolean; token?: string } = {}
): DestructuredAxiosInstance => {
  const { rawData, token, ..._options } = options;
  const axios = Axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    data: {},
    timeout: 10000,
    ..._options,
  });

  axios.interceptors.response.use((res) => {
    if (rawData) {
      return res;
    }
    if (res.data?.data === undefined) {
      return res.data;
    }
    return res.data.data;
  });
  return axios;
};

export interface DestructuredAxiosInstance extends AxiosInstance {
  get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  head<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  options<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
}
