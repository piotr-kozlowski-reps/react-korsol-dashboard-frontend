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
  useGetOwners,
  usePostOwner,
  usePutOwner,
  useDeleteOwner,
} from "../hooks/useOwnersCRUDData";
import {
  useGetPlanters,
  usePostPlanter,
  usePutPlanter,
  useDeletePlanter,
} from "../hooks/usePlantersCRUDData";

import Header from "../components/Header";
import { Owner, Planter } from "../utils/types/app.types";

const Planters = () => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const [planters, setPlanters] = useState<
    { result: Planter[]; count: number } | undefined
  >(undefined);

  ////CRUD
  //get
  const { data, isFetching, isError, error } = useGetPlanters();
  useEffect(() => {
    if (data) setPlanters({ ...data.data });
  }, [data]);
  //post/put
  const { mutate: postMutate } = usePostPlanter();
  const { mutate: putMutate } = usePutPlanter();
  const { mutate: deleteMutate } = useDeletePlanter();

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
      postMutate(createPlanterObject(state.data.name));
      state.endEdit();
    }
    if (state.action === "edit") {
      putMutate(state.data);
      state.endEdit();
    }
    if (state.requestType === "delete") {
      deleteMutate(state.data[0].planterId);
      state.endEdit();
    }
  }

  ////utils
  function createPlanterObject(name: string) {
    const newPlanterId = uuidv4();
    const planter: Planter = {
      planterId: newPlanterId,
      name: name,
    };
    return planter;
  }

  ////jsx
  let content = (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("common:monitoring")} title={t("common:planters")} />
      <div className="font-loading animate-pulse">some dummy text </div>
      <div className="font-loading animate-pulse">
        somevery verydummydummytemporarytext text{" "}
      </div>
      <div className="font-loading animate-pulse">some dummy text </div>
    </div>
  );
  if (planters) {
    content = (
      <Fragment>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <Header
            category={t("common:monitoring")}
            title={t("common:planters")}
          />
          <GridComponent
            dataSource={planters}
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
                headerText="Sadzarka"
                textAlign="Center"
                width="150"
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

export default Planters;
