import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";
import { Owner } from "../utils/types/app.types";

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

interface OwnersFetchedData {
  result: Owner[];
  count: number;
}

////GET
const getOwners = () =>
  axios.get<OwnersFetchedData>(
    `${process.env.REACT_APP_BACKEND_URL}/api/owners/`,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const useGetOwners = () => {
  return useQuery(["owners"], () => getOwners());
};

////POST
const postOwner = (ownerData: Owner) =>
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/owners/`, ownerData, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const usePostOwner = () => {
  const queryClient = useQueryClient();
  return useMutation(postOwner, {
    onSuccess: () => {
      queryClient.invalidateQueries(["owners"]);
    },
  });
};

////PUT
const putOwner = (ownerData: Owner) =>
  axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/owners/`, ownerData, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const usePutOwner = () => {
  const queryClient = useQueryClient();
  return useMutation(putOwner, {
    onSuccess: () => {
      queryClient.invalidateQueries(["owners"]);
    },
  });
};

////DELETE
const deleteOwner = (ownerId: string) =>
  axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/owners/${ownerId}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useDeleteOwner = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOwner, {
    onSuccess: () => {
      queryClient.invalidateQueries(["owners"]);
    },
  });
};
