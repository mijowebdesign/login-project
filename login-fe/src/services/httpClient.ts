import type { AxiosRequestConfig, AxiosResponse } from "axios";
import baseApi from "./baseApi";



// Koristimo <T = any> kao default vrednost ako tip nije prosleđen
export const getByPathAndParams = <T = any>(
  path: string, 
  params: Record<string, any> = {}, 
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> =>
  baseApi.get<T>(path, {
    params: params,
    ...config,
  });

export const postByPathAndData = <T = any>(
  path: string, 
  data: Record<string, any> = {}, 
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> =>
  baseApi.post<T>(path, data, config);

export const putByPathAndData = <T = any>(
  path: string, 
  data: Record<string, any> = {}, 
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> =>
  baseApi.put<T>(path, data, config);

export const deleteByPath = <T = any>(
  path: string, 
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> =>
  baseApi.delete<T>(path, config);