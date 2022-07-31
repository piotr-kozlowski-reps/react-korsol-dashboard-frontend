import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DashboardFetched } from "../utils/types/app.types";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

//TODO: proper type here to be fetched
const fetchDashboard = () =>
  axios.get<DashboardFetched>(
    `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/`,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const useDashboardGetData = () => {
  return useQuery(["dashboard"], () => fetchDashboard());
};
