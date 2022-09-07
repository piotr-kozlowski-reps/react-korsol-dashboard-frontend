import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";
import { Greenhouse } from "../utils/types/app.types";

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

////GET
const getGreenhouses = () =>
  axios.get<Greenhouse[]>(
    `${process.env.REACT_APP_BACKEND_URL}/api/greenhouses/`,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const useGetGreenhouses = () => {
  return useQuery(["greenhouses"], () => getGreenhouses(), {
    refetchOnWindowFocus: false,
  });
};

////DELETE
const deleteGreenhouse = (id: string) =>
  axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/greenhouses/${id}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useDeleteGreenhouse = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteGreenhouse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["greenhouses"]);
    },
  });
};

////POST
const postGreenhouse = (greenhouseData: Greenhouse) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/greenhouses/`,
    greenhouseData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePostGreenhouse = () => {
  const queryClient = useQueryClient();
  return useMutation(postGreenhouse);
};

////PUT
const putGreenhouse = (greenhouseData: Greenhouse) =>
  axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/greenhouses/`,
    greenhouseData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePutGreenhouse = () => {
  const queryClient = useQueryClient();
  return useMutation(putGreenhouse);
};
