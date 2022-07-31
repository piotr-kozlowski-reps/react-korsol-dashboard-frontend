import { useQuery } from "@tanstack/react-query";
import { axiosWithToken } from "../utils/axios-utils";
import { config } from "../utils/dummies/config";
import axios from "axios";
import { ConfigFetched } from "../utils/types/app.types";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

const fetchConfig = () =>
  axios.get<ConfigFetched>(`${process.env.REACT_APP_BACKEND_URL}/api/config/`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useConfigGetData = () => {
  return useQuery(["config"], () => fetchConfig(), {});
};
