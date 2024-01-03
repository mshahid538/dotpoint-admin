import { handleApiError, handleRequest, handleResponse } from "./ClientHelper";
import Axios from "axios";

export function axiosClient(baseURL: string) {
  // console.log("baseURL",baseURL);
  
  const clientInstance = Axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json", 
    },
  });
  clientInstance.interceptors.request.use(handleRequest);
  clientInstance.interceptors.response.use(handleResponse, handleApiError);
  return clientInstance;
}

export function axiosClientFormData(baseURL: string) {
  // console.log("baseURL",baseURL);
  
  const clientInstance = Axios.create({
    baseURL,
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
  clientInstance.interceptors.request.use(handleRequest);
  clientInstance.interceptors.response.use(handleResponse, handleApiError);
  return clientInstance;
}
