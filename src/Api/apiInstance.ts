import { BaseUrl } from './AuthApi';
import {axiosClient, axiosClientFormData} from './AxiosClient';
export const apiInstance = axiosClient(BaseUrl);
export const apiInstanceFormData = axiosClientFormData(BaseUrl);
