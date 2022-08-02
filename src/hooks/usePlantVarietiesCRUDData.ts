import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

////POST
const postPlantVarieties = (plantData: PlantVariety) =>
  axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/plant-varieties/`,
    plantData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePostPlantVarieties = () => {
  const queryClient = useQueryClient();
  return useMutation(postPlantVarieties, {
    onSuccess: () => {
      queryClient.invalidateQueries(["plantVarieties"]);
    },
  });
  // {
  // onSuccess: (data) => {
  //   // queryClient.invalidateQueries(["plantVarieties"]);
  //   queryClient.setQueryData(["plantVarieties"], (oldQueryData: any) => {
  //     return {
  //       ...oldQueryData,
  //       data: [...oldQueryData.data, data.data],
  //     };
  //   });
  // },
  //   onMutate: async (newPlant) => {
  //     await queryClient.cancelQueries(["plantVarieties"]);
  //     const previousPlantsData = queryClient.getQueryData(["plantVarieties"]);
  //     queryClient.setQueryData(["plantVarieties"], (oldQueryData: any) => {
  //       return {
  //         ...oldQueryData,
  //         data: [...oldQueryData.data, newPlant],
  //       };
  //     });
  //     return { previousPlantsData };
  //   },
  //   onError: (_error, _plant, context) => {
  //     queryClient.setQueryData(["plantVarieties"], context?.previousPlantsData);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["plantVarieties"]);
  //     // return new Promise((resolve, reject) => {
  //     //   resolve(true);
  //     // });
  //   },
  // });
};

////PUT
const putPlantVarieties = (plantData: PlantVariety) =>
  axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/api/plant-varieties/`,
    plantData,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const usePutPlantVarieties = () => {
  const queryClient = useQueryClient();
  return useMutation(putPlantVarieties, {
    onSuccess: () => {
      queryClient.invalidateQueries(["plantVarieties"]);
    },
  });
};

////DELETE
const deletePlantVarieties = (plantId: string) =>
  axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/api/plant-varieties/${plantId}`,
    {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    }
  );

export const useDeletePlantVarieties = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePlantVarieties, {
    onSuccess: () => {
      queryClient.invalidateQueries(["plantVarieties"]);
    },
  });
};
