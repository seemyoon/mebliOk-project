import { AxiosRequestConfig } from 'axios';

export interface IAxiosReqConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

