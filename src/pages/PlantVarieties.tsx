import React, { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../contexts/theme-context";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Page,
  Edit,
  Inject,
  Toolbar,
  ToolbarItems,
  Group,
  EditSettingsModel,
  Sort,
} from "@syncfusion/ej2-react-grids";
import {
  useDeletePlantVarieties,
  useGetPlantVarieties,
} from "../hooks/usePlantVarietiesCRUDData";
import { usePostPlantVarieties } from "../hooks/usePlantVarietiesCRUDData";
import { usePutPlantVarieties } from "../hooks/usePlantVarietiesCRUDData";

import Header from "../components/Header";
import { PlantVariety } from "../utils/types/app.types";

const PlantVarieties = () => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const [plantVarieties, setPlantVarieties] = useState<
    { result: PlantVariety[]; count: number } | undefined
  >(undefined);

  ////CRUD
  //get
  const { data, isFetching, isError, error } = useGetPlantVarieties();
  useEffect(() => {
    if (data) setPlantVarieties({ ...data.data });
  }, [data]);

  //post/put
  const { mutate: postMutate } = usePostPlantVarieties();
  const { mutate: putMutate } = usePutPlantVarieties();
  const { mutate: deleteMutate } = useDeletePlantVarieties();

  ////grid options
  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: "Dialog",
  };
  const toolbarOptions: ToolbarItems[] = ["Add", "Edit", "Delete"];

  ////
  async function dataSourceChanged(state: any) {
    console.log(state);

    if (state.action === "add") {
      console.log("add");
      postMutate(createPlantObject(state.data.varietyCode, state.data.name));
      state.endEdit();
    }
    if (state.action === "edit") {
      console.log("edit");
      putMutate(state.data);
      state.endEdit();
    }
    if (state.requestType === "delete") {
      console.log("delete");
      deleteMutate(state.data); //TODO: plantId tutaj
      state.endEdit();
    }
  }

  ////utils
  function createPlantObject(varietyCode: string, name: string) {
    const newPlantId = uuidv4();
    const plant: PlantVariety = {
      plantId: newPlantId,
      varietyCode: varietyCode,
      name: name,
    };
    return plant;
  }

  ////jsx
  let content = (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("common:monitoring")} title={t("common:varietes")} />
      <div className="font-loading animate-pulse">some dummy text </div>
      <div className="font-loading animate-pulse">
        somevery verydummydummytemporarytext text{" "}
      </div>
      <div className="font-loading animate-pulse">some dummy text </div>
    </div>
  );
  if (plantVarieties) {
    content = (
      <Fragment>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <Header
            category={t("common:monitoring")}
            title={t("common:varietes")}
          />
          <GridComponent
            dataSource={plantVarieties}
            allowSorting={true}
            allowGrouping
            allowPaging
            pageSettings={{ pageSize: 10 }}
            toolbar={toolbarOptions}
            editSettings={editOptions}
            dataSourceChanged={dataSourceChanged}
            // dataStateChange={dataStageChanged}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="name"
                headerText="Nazwa"
                textAlign="Center"
                width="100%"
              />
              <ColumnDirective
                field="varietyCode"
                headerText="Kod odmiany"
                textAlign="Center"
                width="200"
              />
            </ColumnsDirective>
            <Inject services={[Resize, Edit, Toolbar, Page, Group, Sort]} />
          </GridComponent>
        </div>
      </Fragment>
    );
  }
  return content;
};

export default PlantVarieties;

// const PlantVarieties: NextPageWithLayout = () => {
//   ////vars
//   // const { isLoading, sendRequest, clearError, error } = useHttpClient();
//   const [plantsVarietes, setPlantsVarietes] = useState<
//     PlantVarietyFetchedData | {}
//   >({});

//   //fetchingData
//   let apiUrl = "";
//   let token = "";
//   let userId = "";
//   if (isBrowser()) {
//     if (localStorage.getItem("userData") !== "undefined") {
//       const localStorageAsObject: LocalStorageUserData = JSON.parse(
//         localStorage.getItem("userData") as string
//       );
//       token = localStorageAsObject.token;
//       userId = localStorageAsObject.userId;
//     }
//   }
//   // let plantsVarietesFetched;
//   // if (isBrowser()) {
//   //   if (localStorage.getItem("userData") !== "undefined") {
//   //     const localStorageAsObject: LocalStorageUserData = JSON.parse(
//   //       localStorage.getItem("userData") as string
//   //     );
//   //     token = localStorageAsObject.token;
//   //     userId = localStorageAsObject.userId;
//   //   }

//   //   apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_ADDRESS}/api/plant-varieties/${userId}`;
//   //   const { data: plantsVarietes } = useSWR<PlantVarietyFetchedData>(apiUrl);
//   //   plantsVarietesFetched = plantsVarietes;
//   // }

//   //GET
//   const refreshData = async () => {
//     apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_ADDRESS}/api/plant-varieties/`;

//     // const fetchedResponse = await sendRequest(
//     //   `${process.env.NEXT_PUBLIC_API_BASE_ADDRESS}/api/plant-varieties/${userId}`,
//     //   "GET",
//     //   null,
//     //   { Authorization: `${token}`, "Content-Type": "application/json" }
//     // );

//     fetch(apiUrl, {
//       headers: {
//         Authorization: `${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setPlantsVarietes(data as PlantVarietyFetchedData);
//       });
//   };

//   useEffect(() => {
//     refreshData();
//   }, []);

//   function dataStageChanged(state: any) {
//     console.log(state);
//   }

//   async function dataSourceChanged(state: any) {
//     const newPlantId = uuidv4();
//     const dataToBePosted = { ...state.data };
//     dataToBePosted.plantId = newPlantId;

//     //POST
//     if (state.action === "add" && state.requestType === "save") {
//       return fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_ADDRESS}/api/plant-varieties/`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataToBePosted),
//         }
//       )
//         .then((data) => {
//           return data;
//         })
//         .then((res) => {
//           state.endEdit();
//           refreshData();
//         });
//     }

//     //PUT
//     if (state.action === "edit" && state.requestType === "save") {
//       return fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_ADDRESS}/api/plant-varieties/`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(state.data),
//         }
//       )
//         .then((data) => data)
//         .then((res) => {
//           state.endEdit();
//           refreshData();
//         });
//     }

//     //DELETE
//     if (!state.action && state.requestType === "delete") {
//       return fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_ADDRESS}/api/plant-varieties/${state.data[0].plantId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//         .then((data) => {
//           return data;
//         })
//         .then((res) => refreshData());
//     }
//   }
