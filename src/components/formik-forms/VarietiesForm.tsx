import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../../contexts/theme-context";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariants } from "../../utils/framerMotionAnimationsVariants";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { AxiosError, AxiosResponse } from "axios";
import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { useGetProducts } from "../../hooks/useProductsCRUDData";

import Modal from "../Modal";
import FormikControl from "../formik-components/FormikControl";
import Button from "../Button";

import {
  Variety,
  VarietiesFormValues,
  Product,
  DropDownProductOptions,
} from "../../utils/types/app.types";
import ErrorModal from "../ErrorModal";

interface Props {
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  postItem?: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Variety,
    unknown
  >;
  putItem?: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Variety,
    unknown
  >;
  isPutOrPost: "POST" | "PUT";
  varietyData?: Variety;
}

const VarietiesForm = ({
  onCancel,
  postItem,
  putItem,
  isPutOrPost,
  varietyData,
}: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "loading...",
      name: "loading...",
    },
  ]);

  ////products
  const { data, isLoading } = useGetProducts();
  useEffect(() => {
    if (data) {
      setProducts([...data.data]);
    }
  }, [data]);

  const existingId: string = varietyData ? varietyData.id : "";

  const optionsGenerated: DropDownProductOptions[] = products.map((product) => {
    return { key: product.name, value: product.name };
  });
  const dropDownOptions: DropDownProductOptions[] = [
    { key: t("common:choose-product"), value: "" },
    ...optionsGenerated,
  ];

  ////formik
  const isPutAndHaveAllDesiredData = isPutOrPost === "PUT" && varietyData;

  const initialValuesVarietiesForm: VarietiesFormValues =
    isPutAndHaveAllDesiredData
      ? { product: varietyData.product, variety: varietyData.variety }
      : { product: "", variety: "" };
  const validationSchema = Yup.object({
    variety: Yup.string().required(t("common:varietyNameRequired")),
    product: Yup.mixed().test(
      "products within desired array",
      t("common:varietyProductRequired"),
      (value) => {
        if (!value) return false;

        if (Object.prototype.toString.call(value) !== "[object String]")
          return false;

        const isValueWithinProductsArray = products.find((product) => {
          return product.name === value;
        });

        return isValueWithinProductsArray ? true : false;
      }
    ),
  });

  const submitHandler = async (
    values: VarietiesFormValues,
    formikHelpers: FormikHelpers<VarietiesFormValues>
  ) => {
    const varietytBodyWithoutId: VarietiesFormValues = {
      product: values.product,
      variety: values.variety,
    };

    //version POST
    if (isPutOrPost === "POST" && postItem) {
      const varietyBody: Variety = {
        ...varietytBodyWithoutId,
        id: uuidv4(),
      };

      ////TODO: check if Product is within available Products

      postItem(varietyBody, {
        onSuccess: () => {
          formikHelpers.setSubmitting(false);
          formikHelpers.resetForm();
          queryClient.invalidateQueries(["varieties"]);
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
      const varietyBody: Variety = {
        ...varietytBodyWithoutId,
        id: existingId,
      };

      putItem(varietyBody, {
        onSuccess: () => {
          console.log("onSuccess");
          formikHelpers.setSubmitting(false);
          formikHelpers.resetForm();
          queryClient.invalidateQueries(["varieties"]);
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
              ? t("common:add-variety")
              : t("common:edit-variety")
          }
          onCancel={() => onCancel(false)}
          show={true}
        >
          <Formik
            initialValues={initialValuesVarietiesForm}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
            validateOnMount={true}
          >
            {(formik: FormikProps<VarietiesFormValues>) => {
              return (
                <Form>
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-full pr-6">
                      <FormikControl
                        control="input"
                        type="text"
                        label={`${t("common:variety")}:`}
                        name="variety"
                        placeholder={t("common:varietyNamePlaceholder")}
                        additionalClass=""
                      />
                    </div>

                    <div className="w-full pr-6">
                      <FormikControl
                        control="select"
                        label={`${t("common:product")}: `}
                        name="product"
                        additionalClass=""
                        options={dropDownOptions}
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

export default VarietiesForm;
