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

import { GreenhouseFormValues, Greenhouse } from "../../utils/types/app.types";
import ErrorModal from "../ErrorModal";

interface Props {
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  postItem?: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Greenhouse,
    unknown
  >;
  putItem?: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Greenhouse,
    unknown
  >;
  isPutOrPost: "POST" | "PUT";
  greenhouseData?: Greenhouse;
}

const GreenhousesForm = ({
  onCancel,
  postItem,
  putItem,
  isPutOrPost,
  greenhouseData,
}: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);

  const existingId: string = greenhouseData ? greenhouseData.id : "";

  ////formik
  const isPutAndHaveAllDesiredData = isPutOrPost === "PUT" && greenhouseData;

  const initialValuesGreenhouseForm: GreenhouseFormValues =
    isPutAndHaveAllDesiredData ? { name: greenhouseData.name } : { name: "" };
  const validationSchema = Yup.object({
    name: Yup.string().required(t("common:greenhouseNameRequired")),
  });
  const submitHandler = async (
    values: GreenhouseFormValues,
    formikHelpers: FormikHelpers<GreenhouseFormValues>
  ) => {
    const greenhouseBodyWithoutId: GreenhouseFormValues = {
      name: values.name,
    };

    //version POST
    if (isPutOrPost === "POST" && postItem) {
      const greenhouseBody: Greenhouse = {
        ...greenhouseBodyWithoutId,
        id: uuidv4(),
      };

      postItem(greenhouseBody, {
        onSuccess: () => {
          console.log("onSuccess");
          formikHelpers.setSubmitting(false);
          formikHelpers.resetForm();
          queryClient.invalidateQueries(["greenhouses"]);
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
      const greenhouseBody: Greenhouse = {
        ...greenhouseBodyWithoutId,
        id: existingId,
      };

      putItem(greenhouseBody, {
        onSuccess: () => {
          console.log("onSuccess");
          formikHelpers.setSubmitting(false);
          formikHelpers.resetForm();
          queryClient.invalidateQueries(["greenhouses"]);
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
              ? t("common:add-greenhouse")
              : t("common:edit-greenhouse")
          }
          onCancel={() => onCancel(false)}
          show={true}
        >
          <Formik
            initialValues={initialValuesGreenhouseForm}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
            validateOnMount={true}
          >
            {(formik: FormikProps<GreenhouseFormValues>) => {
              return (
                <Form>
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-full pr-6">
                      <FormikControl
                        control="input"
                        type="text"
                        label={`${t("common:name")}:`}
                        name="name"
                        placeholder={t("common:greenhouseNamePlaceholder")}
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

export default GreenhousesForm;
