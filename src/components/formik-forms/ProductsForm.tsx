import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../../contexts/theme-context";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants } from "../../utils/framerMotionAnimationsVariants";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { AxiosError, AxiosResponse } from "axios";
import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";

import Modal from "../Modal";
import FormikControl from "../formik-components/FormikControl";
import Button from "../Button";

import { ProductFormValues, Product } from "../../utils/types/app.types";
import ErrorModal from "../ErrorModal";

interface Props {
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  postItem?: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Product,
    unknown
  >;
  putItem?: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Product,
    unknown
  >;
  isPutOrPost: "POST" | "PUT";
  productData?: Product;
}

const ProductsForm = ({
  onCancel,
  postItem,
  putItem,
  isPutOrPost,
  productData,
}: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);

  const existingId: string = productData ? productData.id : "";

  ////formik
  const isPutAndHaveAllDesiredData = isPutOrPost === "PUT" && productData;

  const initialValuesProductForm: ProductFormValues = isPutAndHaveAllDesiredData
    ? { name: productData.name }
    : { name: "" };
  const validationSchema = Yup.object({
    name: Yup.string().required(t("common:productNameRequired")),
  });
  const submitHandler = async (
    values: ProductFormValues,
    formikHelpers: FormikHelpers<ProductFormValues>
  ) => {
    const productBodyWithoutId: ProductFormValues = {
      name: values.name,
    };

    //version POST
    if (isPutOrPost === "POST" && postItem) {
      const productBody: Product = {
        ...productBodyWithoutId,
        id: uuidv4(),
      };

      postItem(productBody, {
        onSuccess: () => {
          console.log("onSuccess");
          formikHelpers.setSubmitting(false);
          formikHelpers.resetForm();
          queryClient.invalidateQueries(["products"]);
          onCancel(false);
        },
        onError: (error) => {
          console.log(error);

          const axiosError: AxiosError<any, any> = error as AxiosError;
          if (axiosError) {
            setErrorMessage(
              axiosError.response?.data?.message || t("common:unknownError")
            );
          }

          //confirmation modal
          setIsShowConfirmationModal(true);
          const timer: any = () => {
            setTimeout(() => {
              setIsShowConfirmationModal(false);
              formikHelpers.setSubmitting(false);
              formikHelpers.resetForm();
              onCancel(false);
            }, 1600);
          };
          timer();
          clearTimeout(timer);
        },
      });
    }

    //version PUT
    if (isPutOrPost === "PUT" && putItem) {
      const productBody: Product = {
        ...productBodyWithoutId,
        id: existingId,
      };

      putItem(productBody, {
        onSuccess: () => {
          console.log("onSuccess");
          formikHelpers.setSubmitting(false);
          formikHelpers.resetForm();
          queryClient.invalidateQueries(["products"]);
          onCancel(false);
        },
        onError: (error) => {
          console.log(error);
          const axiosError: AxiosError<any, any> = error as AxiosError;
          if (axiosError) {
            setErrorMessage(
              axiosError.response?.data?.message || t("common:unknownError")
            );
          }

          //confirmation modal
          setIsShowConfirmationModal(true);
          const timer: any = () => {
            setTimeout(() => {
              setIsShowConfirmationModal(false);
              formikHelpers.setSubmitting(false);
              formikHelpers.resetForm();
              onCancel(false);
            }, 1600);
          };
          timer();
          clearTimeout(timer);
        },
      });
    }
  };

  return (
    <Fragment>
      <AnimatePresence>
        {isShowConfirmationModal && (
          <ErrorModal error={errorMessage} onClear={() => {}} />
        )}
      </AnimatePresence>
      <motion.div
        className=""
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Modal
          header={
            isPutOrPost === "POST"
              ? t("common:add-product")
              : t("common:edit-product")
          }
          onCancel={() => onCancel(false)}
          show={true}
        >
          <Formik
            initialValues={initialValuesProductForm}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
            validateOnMount={true}
          >
            {(formik: FormikProps<ProductFormValues>) => {
              return (
                <Form>
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-full pr-6">
                      <FormikControl
                        control="input"
                        type="text"
                        label={`${t("common:name")}:`}
                        name="name"
                        placeholder={t("common:companyNamePlaceholder")}
                        additionalClass=""
                      />
                    </div>

                    <div className="pt-6">
                      <Button
                        disabled={!formik.isValid || formik.isSubmitting}
                        type="submit"
                        color="white"
                        bgColor={currentColor}
                        text={
                          isPutOrPost === "POST"
                            ? t("common:add")
                            : t("common:confirm")
                        }
                        borderRadius="10px"
                        size="md"
                        additionalClass="px-7 mx-2"
                      />

                      <Button
                        type="button"
                        color="white"
                        bgColor={currentColor}
                        text={t("common:cancel")}
                        borderRadius="10px"
                        size="md"
                        additionalClass="px-7 mx-2"
                        onClick={() => onCancel(false)}
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Modal>
      </motion.div>
    </Fragment>
  );
};

export default ProductsForm;
