import axios, { AxiosResponse } from "axios";
import { getDataFromLocalStorage } from "./localStorageUtils";

const client = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

export const axiosWithToken = ({ ...options }) => {
  client.defaults.headers.common.Authorization = token;
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: unknown) => error;

  return client(options).then(onSuccess).catch(onError);
};
