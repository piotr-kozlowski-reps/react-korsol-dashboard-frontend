import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";
import { Company } from "../utils/types/app.types";

const dataFromLocalStorage = getDataFromLocalStorage();
const token = dataFromLocalStorage ? dataFromLocalStorage.token : "";

////GET
const getCompanies = () =>
  axios.get<Company[]>(`${process.env.REACT_APP_BACKEND_URL}/api/companies/`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useGetCompanies = () => {
  return useQuery(["companies"], () => getCompanies(), {
    refetchOnWindowFocus: false,
  });
};

////DELETE
const deleteCompany = (id: string) =>
  axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/companies/${id}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
    },
  });
};

////POST
const postCompany = (companyData: Company) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/companies/`,
    companyData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePostCompany = () => {
  const queryClient = useQueryClient();
  return useMutation(postCompany);
};

////PUT
const putCompany = (companyData: Company) =>
  axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/companies/`,
    companyData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePutCompany = () => {
  const queryClient = useQueryClient();
  return useMutation(putCompany);
};
