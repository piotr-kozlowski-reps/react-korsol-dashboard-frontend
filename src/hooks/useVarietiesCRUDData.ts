import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";
import { Variety } from "../utils/types/app.types";

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

////GET
const getVarieties = () =>
  axios.get<Variety[]>(`${process.env.REACT_APP_BACKEND_URL}/api/varieties/`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useGetVarieties = () => {
  return useQuery(["varieties"], () => getVarieties(), {
    refetchOnWindowFocus: false,
  });
};

////DELETE
const deleteVariety = (id: string) =>
  axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/varieties/${id}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useDeleteVariety = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteVariety, {
    onSuccess: () => {
      queryClient.invalidateQueries(["varieties"]);
    },
  });
};

////POST
const postVariety = (varietyData: Variety) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/varieties/`,
    varietyData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePostVarieties = () => {
  const queryClient = useQueryClient();
  return useMutation(postVariety);
};

////PUT
const putVarieties = (varietyData: Variety) =>
  axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/varieties/`,
    varietyData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePutVariety = () => {
  const queryClient = useQueryClient();
  return useMutation(putVarieties);
};
