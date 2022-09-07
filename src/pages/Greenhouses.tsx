import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../contexts/theme-context";
import { motion } from "framer-motion";
import { containerVariants } from "../utils/framerMotionAnimationsVariants";
import { Greenhouse } from "../utils/types/app.types";
import {
  useGetGreenhouses,
  useDeleteGreenhouse,
  usePostGreenhouse,
  usePutGreenhouse,
} from "../hooks/useGreenhousesCRUDData";

import Header from "../components/Header";
import GreenhousesTable from "../components/tables-components/GreenhousesTable";

const Greenhouses = () => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([
    { id: "", name: "" },
  ]);

  ////CRUD
  const { data, isLoading } = useGetGreenhouses();
  const { mutate: postMutate } = usePostGreenhouse();
  const { mutate: putMutate } = usePutGreenhouse();
  const { mutate: deleteMutate } = useDeleteGreenhouse();
  useEffect(() => {
    if (data) {
      setGreenhouses([...data.data]);
    }
  }, [data]);

  ////jsx
  let content = (
    <motion.div
      className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Header
        category={t("common:dictionaries")}
        title={t("common:greenhouses")}
      />
      <div className="font-loading animate-pulse">aaaa aaaaa aaaa </div>
      <div className="font-loading font-light animate-pulse ">
        aaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaa
      </div>
      <div className="font-loading animate-pulse">aaaa aaaaa aaaa </div>
    </motion.div>
  );
  if (greenhouses && !isLoading) {
    content = (
      <Fragment>
        <motion.div
          className="m-2 mt-20 md:mt-0 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Header
            category={t("common:dictionaries")}
            title={t("common:greenhouses")}
          />
          <GreenhousesTable
            tableData={greenhouses}
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

export default Greenhouses;
