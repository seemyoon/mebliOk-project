import axios, { AxiosError } from 'axios';
import { baseUrl } from '../constants/url';

import { retrieveLocalStorage } from '../helpers/retrieveLocalStorage';
import { ITokenObtainPair } from '../interfaces/ITokenObtainPair';
import { IAxiosReqConfig } from '../interfaces/IAxiosReqConfig';


const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {},
});

axiosInstance.interceptors.request.use((req) => {
  req.headers.set('Content-Type', 'application/json');
  
  if (localStorage.getItem('tokenPair') && req.url !== '/auth' && req.url !== '/auth/refresh') {
    req.headers.set('Authorization', 'Bearer' + retrieveLocalStorage<ITokenObtainPair>('tokenPair').accessToken);
  }
  
  return req;
});

axios.interceptors.response.use(
  response => response,
  
  async (error: AxiosError) => {
    const originalReq = error.config as IAxiosReqConfig;
    
    
    if (
      error.response?.status === 401 &&
      !originalReq._retry &&
      originalReq.url !== '/auth/refresh'
    ) {
      originalReq._retry = true;
    }
    
    return Promise.reject(error);
  });

export { axiosInstance };