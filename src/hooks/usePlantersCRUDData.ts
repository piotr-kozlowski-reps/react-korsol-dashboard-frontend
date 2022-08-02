import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";
import { Planter } from "../utils/types/app.types";

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

interface PlantersFetchedData {
  result: Planter[];
  count: number;
}

////GET
const getPlanters = () =>
  axios.get<PlantersFetchedData>(
    `${process.env.REACT_APP_BACKEND_URL}/api/planters/`,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const useGetPlanters = () => {
  return useQuery(["planters"], () => getPlanters());
};

////POST
const postPlanter = (planterData: Planter) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/planters/`,
    planterData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePostPlanter = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlanter, {
    onSuccess: () => {
      queryClient.invalidateQueries(["planters"]);
    },
  });
};

////PUT
const putPlanter = (planterData: Planter) =>
  axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/planters/`, planterData, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const usePutPlanter = () => {
  const queryClient = useQueryClient();
  return useMutation(putPlanter, {
    onSuccess: () => {
      queryClient.invalidateQueries(["planters"]);
    },
  });
};

////DELETE
const deletePlanter = (planterId: string) =>
  axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/api/planters/${planterId}`,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const useDeletePlanter = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePlanter, {
    onSuccess: () => {
      queryClient.invalidateQueries(["planters"]);
    },
  });
};
