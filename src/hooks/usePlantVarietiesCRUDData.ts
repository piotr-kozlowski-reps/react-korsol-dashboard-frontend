import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";
import { PlantVariety } from "../utils/types/app.types";

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

interface PlantVarietiesFetched {
  result: PlantVariety[];
  count: number;
}

////GET
const getPlantVarieties = () =>
  axios.get<PlantVarietiesFetched>(
    `${process.env.REACT_APP_BACKEND_URL}/api/plant-varieties/`,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const useGetPlantVarieties = () => {
  return useQuery(["plantVarieties"], () => getPlantVarieties());
};
