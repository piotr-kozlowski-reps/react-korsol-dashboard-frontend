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
const deleteCompanies = (id: string) =>
  axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/companies/${id}`, {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  });

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCompanies, {
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
    },
  });
};

// ////POST
// const postField = (fieldData: Field) =>
//   axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/fields/`, fieldData, {
//     headers: {
//       Authorization: token,
//       Accept: "application/json",
//     },
//   });

// export const usePostField = () => {
//   const queryClient = useQueryClient();
//   return useMutation(postField, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["fields"]);
//     },
//   });
// };

// ////PUT
// const putField = (fieldData: Field) =>
//   axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/fields/`, fieldData, {
//     headers: {
//       Authorization: token,
//       Accept: "application/json",
//     },
//   });

// export const usePutField = () => {
//   const queryClient = useQueryClient();
//   return useMutation(putField, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["fields"]);
//     },
//   });
// };
