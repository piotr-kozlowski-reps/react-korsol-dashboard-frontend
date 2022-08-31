import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../contexts/theme-context";
import { motion } from "framer-motion";
import { containerVariants } from "../utils/framerMotionAnimationsVariants";
import { Company } from "../utils/types/app.types";
import { v4 as uuidv4 } from "uuid";
import {
  useGetCompanies,
  useDeleteCompany,
  usePostCompany,
  usePutCompany,
} from "../hooks/useCompaniesCRUDData";

import Header from "../components/Header";
import CompaniesTable from "../components/tables-components/CompaniesTable";

const Companies = () => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const [companies, setCompanies] = useState<Company[]>([{ id: "", name: "" }]);

  ////CRUD
  const { data, isLoading, isFetching, isError, error } = useGetCompanies();
  const { mutate: postMutate } = usePostCompany();
  const { mutate: putMutate } = usePutCompany();
  const { mutate: deleteMutate } = useDeleteCompany();
  useEffect(() => {
    if (data) {
      setCompanies([...data.data]);
    }
  }, [data]);

  ////jsx
  let content = (
    <motion.div
      className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Header
        category={t("common:dictionaries")}
        title={t("common:companies")}
      />
      <div className="font-loading animate-pulse">some dummy text </div>
      <div className="font-loading font-light animate-pulse ">
        somevery verydummydummytemporarytext text
      </div>
      <div className="font-loading animate-pulse">some dummy text </div>
    </motion.div>
  );
  if (companies && !isLoading) {
    content = (
      <Fragment>
        <motion.div
          className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Header
            category={t("common:dictionaries")}
            title={t("common:companies")}
          />
          <CompaniesTable
            tableData={companies}
            deleteItem={deleteMutate}
            postItem={postMutate}
            putItem={putMutate}
          />
        </motion.div>
      </Fragment>
    );
  }
  return content;
};

export default Companies;

//   ////grid options
//   const editOptions: EditSettingsModel = {
//     allowAdding: true,
//     allowEditing: true,
//     allowDeleting: true,
//     mode: "Dialog",
//   };
//   const toolbarOptions: ToolbarItems[] = ["Add", "Edit", "Delete"];

//   ////
//   async function dataSourceChanged(state: any) {
//     if (state.action === "add") {
//       postMutate(
//         createFieldObject(
//           state.data.area,
//           state.data.details,
//           state.data.name,
//           state.data.fieldNumber,
//           state.data.owner,
//           state.data.planter
//         )
//       );
//       state.endEdit();
//     }
//     if (state.action === "edit") {
//       putMutate(state.data);
//       state.endEdit();
//     }
//     if (state.requestType === "delete") {
//       deleteMutate(state.data[0].fieldId);
//       state.endEdit();
//     }
//   }

//   ////utils
//   function createFieldObject(
//     area: string,
//     details: string,
//     name: string,
//     fieldNumber: number,
//     owner: string,
//     planter: string
//   ) {
//     const newFieldId = uuidv4();
//     const field: Field = {
//       fieldId: newFieldId,
//       area: area,
//       details: details,
//       name: name,
//       fieldNumber: fieldNumber,
//       owner: owner,
//       planter: planter,
//     };
//     return field;
//   }

// };

// export default Fields;
