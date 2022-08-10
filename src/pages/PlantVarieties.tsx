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
      deleteMutate(state.data[0].plantId);
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
            // allowSorting={true}
            // allowGrouping
            // allowPaging
            pageSettings={{ pageSize: 10 }}
            toolbar={toolbarOptions}
            editSettings={editOptions}
            dataSourceChanged={dataSourceChanged}
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
