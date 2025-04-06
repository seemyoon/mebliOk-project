import axios from 'axios';
import { baseUrl } from '../constants/url';
import { retrieveLocalStorage } from '../helpers/retrieveLocalStorage';
import { ITokenObtainPair } from '../interfaces/ITokenObtainPair';
import { ISignUpUserData } from '../interfaces/ISignUpUserData';
import { IAuthResponseData } from '../interfaces/IAuthResponseData';
import { ISignInUserData } from '../interfaces/ISignInUserData';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {},
});

axiosInstance.interceptors.request.use((requestObject) => {
  if (localStorage.getItem('tokenPair') && requestObject.url !== '/auth' && requestObject.url !== '/auth/refresh') {
    requestObject.headers.set('Authorization', 'Bearer' + retrieveLocalStorage<ITokenObtainPair>('tokenPair').accessToken);
  }
  return requestObject;
});

const authService = {
  signUp: async (signUpUserData: ISignUpUserData): Promise<boolean> => {
    const response = await axiosInstance.post<IAuthResponseData>('/auth/sing-up', signUpUserData);
    localStorage.setItem('tokenPair', JSON.stringify(response.data.tokens));
    return !!response.data.user || false;
  },
  
  signIn: async (signInUserData: ISignInUserData): Promise<void> => {
    const response = await axiosInstance.post<IAuthResponseData>('/auth/sing-in', signInUserData);
    localStorage.setItem('tokenPair', JSON.stringify(response.data.tokens));
  },
  refreshToken: async (): Promise<void> => {
    const refreshToken = retrieveLocalStorage<ITokenObtainPair>('tokenPair').refreshToken;
    const response = await axiosInstance.post<ITokenObtainPair>('/auth/refresh', { refresh: refreshToken });
    localStorage.setItem('tokenPair', JSON.stringify(response.data));
  },
  logOut: async (): Promise<void> => {
    await axiosInstance.post('auth/log-out');
    localStorage.removeItem('tokenPair');
  },
  
};

export { authService };