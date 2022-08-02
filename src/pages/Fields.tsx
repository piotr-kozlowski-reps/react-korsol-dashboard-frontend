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
  useGetFields,
  usePostField,
  usePutField,
  useDeleteField,
} from "../hooks/useFieldsCRUDData";

import Header from "../components/Header";
import { Field, PlantVariety } from "../utils/types/app.types";

const Fields = () => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const [fields, setFields] = useState<
    { result: Field[]; count: number } | undefined
  >(undefined);

  ////CRUD
  //get
  const { data, isFetching, isError, error } = useGetFields();
  useEffect(() => {
    if (data) setFields({ ...data.data });
  }, [data]);
  //post/put
  const { mutate: postMutate } = usePostField();
  const { mutate: putMutate } = usePutField();
  const { mutate: deleteMutate } = useDeleteField();

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
      postMutate(
        createFieldObject(
          state.data.area,
          state.data.details,
          state.data.name,
          state.data.fieldNumber,
          state.data.owner,
          state.data.planter
        )
      );
      state.endEdit();
    }
    if (state.action === "edit") {
      putMutate(state.data);
      state.endEdit();
    }
    if (state.requestType === "delete") {
      deleteMutate(state.data[0].fieldId);
      state.endEdit();
    }
  }

  ////utils
  function createFieldObject(
    area: string,
    details: string,
    name: string,
    fieldNumber: number,
    owner: string,
    planter: string
  ) {
    const newFieldId = uuidv4();
    const field: Field = {
      fieldId: newFieldId,
      area: area,
      details: details,
      name: name,
      fieldNumber: fieldNumber,
      owner: owner,
      planter: planter,
    };
    return field;
  }

  ////jsx
  let content = (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("common:monitoring")} title={t("common:fields")} />
      <div className="font-loading animate-pulse">some dummy text </div>
      <div className="font-loading animate-pulse">
        somevery verydummydummytemporarytext text{" "}
      </div>
      <div className="font-loading animate-pulse">some dummy text </div>
    </div>
  );
  if (fields) {
    content = (
      <Fragment>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
          <Header
            category={t("common:monitoring")}
            title={t("common:fields")}
          />
          <GridComponent
            dataSource={fields}
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
                width="150"
              />
              <ColumnDirective
                field="fieldNumber"
                headerText="Nr pola"
                textAlign="Center"
                width="120"
              />
              <ColumnDirective
                field="area"
                headerText="Obszar"
                textAlign="Center"
                width="100"
              />
              <ColumnDirective
                field="details"
                headerText="Szczegóły lokalizacji"
                textAlign="Center"
                width="200"
              />
              <ColumnDirective
                field="planter"
                headerText="Sadzarka"
                textAlign="Center"
                width="100"
              />
              <ColumnDirective
                field="owner"
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

export default Fields;
