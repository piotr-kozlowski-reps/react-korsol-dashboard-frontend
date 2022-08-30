import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../../contexts/theme-context";
import { motion } from "framer-motion";
import { containerVariants } from "../../utils/framerMotionAnimationsVariants";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { AxiosResponse } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";

import Modal from "../Modal";
import FormikControl from "../formik-components/FormikControl";
import Button from "../Button";

import { Company, CompanyFormValues } from "../../utils/types/app.types";

interface Props {
  onCancel: React.Dispatch<React.SetStateAction<boolean>>;
  postItem: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Company,
    unknown
  >;
}

const CompaniesForm = ({ onCancel, postItem }: Props) => {
  ////vars
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();

  ////formik
  const initialValuesLoginForm: CompanyFormValues = {
    name: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(t("common:companyNameRequired")),
  });
  const submitHandler = async (
    values: CompanyFormValues,
    formikHelpers: FormikHelpers<CompanyFormValues>
  ) => {
    const companyBodyWithoutId: CompanyFormValues = {
      name: values.name,
    };

    const companyBody: Company = { ...companyBodyWithoutId, id: uuidv4() };
    console.log(companyBody);

    postItem(companyBody, {
      onSuccess: () => {
        formikHelpers.setSubmitting(false);
        formikHelpers.resetForm();
      },
      onError: (error) => {
        // const axiosError: AxiosError<any, any> = error as AxiosError;
        // if (axiosError) {
        //   setErrorMessage(axiosError.response?.data?.message);
        // }
        //confirmation modal
        // setIsShowConfirmationModal(true);
        // const timer: any = () => {
        //   setTimeout(() => {
        //     setIsShowConfirmationModal(false);
        //     formikHelpers.setSubmitting(false);
        //     formikHelpers.resetForm();
        //   }, 1600);
        // };
        // timer();
        // clearTimeout(timer);
      },
    });
  };

  return (
    <motion.div
      className=""
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Modal
        header={t("common:add-company")}
        onCancel={() => onCancel(false)}
        // headerClass={props.headerClass ? props.headerClass : ""}
        // show={!!props.error}
        show={true}
      >
        <Formik
          initialValues={initialValuesLoginForm}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
          validateOnMount={true}
        >
          {(formik: FormikProps<CompanyFormValues>) => {
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
                      text={t("common:add")}
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
      {/* <div className="flex justify-between items-center bg-red-400">
        <p className="font-semibold text-lg dark:text-gray-200">
          {t("common:userProfile")}
        </p>
        <Tooltip
          content={t("common:close")}
          placement="bottom"
          {...tooltipMain}
        >
          <button
            type="button"
            onClick={() => {
              handleClickOff("userProfile");
            }}
            className="text-xl rounded-full p-3 hover:bg-light-gray  block hover:shadow-lg dark:text-white dark:hover:text-black"
          >
            <MdOutlineCancel />
          </button>
        </Tooltip>
      </div> */}

      {/* <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          src={userProfileImage ? userProfileImage : dummyProfilePhoto}
          alt="User Profile"
          className="rounded-full h-24 w-24"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {userProfileName
              ? `${userProfileName} ${userProfileSurname}`
              : t("common:unknown")}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-200">
            {userProfileEmail ? userProfileEmail : t("common:unknown")}
          </p>
        </div>
      </div> */}

      {/* <div
        className="flex group items-center gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-light-gray rounded-lg"
        onClick={() => alert("not implemented")}
      >
        <button
          type="button"
          className="text-xl dark:text-gray-200 rounded-lg p-3 dark:group-hover:text-black"
        >
          <AiOutlineUser />
        </button>
        <div>
          <p className="font-semibold dark:text-gray-200 dark:group-hover:text-black">
            {t("common:yourProfile")}
          </p>
        </div>
      </div> */}

      {/* <div className="mt-5">
        <Button
          type="button"
          color="white"
          bgColor={currentColor}
          text={t("common:logout")}
          borderRadius="10px"
          width="full"
          onClick={logoutHandler}
        />
      </div> */}
    </motion.div>
  );
};

export default CompaniesForm;
