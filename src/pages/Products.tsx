import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../contexts/theme-context";
import { motion } from "framer-motion";
import { containerVariants } from "../utils/framerMotionAnimationsVariants";
import { Product } from "../utils/types/app.types";
import {
  useGetProducts,
  useDeleteProduct,
  usePostProduct,
  usePutProduct,
} from "../hooks/useProductsCRUDData";

import Header from "../components/Header";
import ProductsTable from "../components/tables-components/ProductsTable";

const Products = () => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const [products, setProducts] = useState<Product[]>([{ id: "", name: "" }]);

  ////CRUD
  const { data, isLoading } = useGetProducts();
  const { mutate: postMutate } = usePostProduct();
  const { mutate: putMutate } = usePutProduct();
  const { mutate: deleteMutate } = useDeleteProduct();
  useEffect(() => {
    if (data) {
      setProducts([...data.data]);
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
        title={t("common:products")}
      />
      <div className="font-loading animate-pulse">aaaa aaaaa aaaa </div>
      <div className="font-loading font-light animate-pulse ">
        aaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaa
      </div>
      <div className="font-loading animate-pulse">aaaa aaaaa aaaa </div>
    </motion.div>
  );
  if (products && !isLoading) {
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
            title={t("common:products")}
          />
          <ProductsTable
            tableData={products}
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

export default Products;
