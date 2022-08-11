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
  return useQuery(["companies"], () => getCompanies());
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

// ////DELETE
// const deleteField = (fieldId: string) =>
//   axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/fields/${fieldId}`, {
//     headers: {
//       Authorization: token,
//       Accept: "application/json",
//     },
//   });

// export const useDeleteField = () => {
//   const queryClient = useQueryClient();
//   return useMutation(deleteField, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["fields"]);
//     },
//   });
// };
