import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";
import { Product } from "../utils/types/app.types";

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

////GET
const getProducts = () =>
  axios.get<Product[]>(`${process.env.REACT_APP_BACKEND_URL}/api/products/`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useGetProducts = () => {
  return useQuery(["products"], () => getProducts(), {
    refetchOnWindowFocus: false,
  });
};

////DELETE
const deleteProduct = (id: string) =>
  axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

////POST
const postProduct = (productData: Product) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/products/`,
    productData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePostProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(postProduct);
};

////PUT
const putProduct = (productData: Product) =>
  axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/products/`, productData, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const usePutProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(putProduct);
};
