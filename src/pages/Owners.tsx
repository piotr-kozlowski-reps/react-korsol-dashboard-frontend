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

import Header from "../components/Header";
import { Owner } from "../utils/types/app.types";

const Owners = () => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const [owners, setOwners] = useState<
    { result: Owner[]; count: number } | undefined
  >(undefined);

  ////CRUD
  //get
  const { data, isFetching, isError, error } = useGetOwners();
  useEffect(() => {
    if (data) setOwners({ ...data.data });
  }, [data]);
  //post/put
  const { mutate: postMutate } = usePostOwner();
  const { mutate: putMutate } = usePutOwner();
  const { mutate: deleteMutate } = useDeleteOwner();

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
      postMutate(createOwnerObject(state.data.name));
      state.endEdit();
    }
    if (state.action === "edit") {
      putMutate(state.data);
      state.endEdit();
    }
    if (state.requestType === "delete") {
      deleteMutate(state.data[0].ownerId);
      state.endEdit();
    }
  }

  ////utils
  function createOwnerObject(name: string) {
    const newOwnerId = uuidv4();
    const owner: Owner = {
      ownerId: newOwnerId,
      name: name,
    };
    return owner;
  }

  ////jsx
  let content = (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("common:monitoring")} title={t("common:owners")} />
      <div className="font-loading animate-pulse">some dummy text </div>
      <div className="font-loading animate-pulse">
        somevery verydummydummytemporarytext text{" "}
      </div>
      <div className="font-loading animate-pulse">some dummy text </div>
    </div>
  );
  if (owners) {
    content = (
      <Fragment>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <Header
            category={t("common:monitoring")}
            title={t("common:owners")}
          />
          <GridComponent
            dataSource={owners}
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
                headerText="Właściciel"
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

export default Owners;
