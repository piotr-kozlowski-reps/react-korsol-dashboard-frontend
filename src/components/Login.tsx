import React, { useState } from "react";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";

import { ClimbingBoxLoader } from "react-spinners";
import { LoginFormValues } from "../utils/types/app.types";
import { useTranslation } from "react-i18next";
import { useThemeProvider } from "../contexts/theme-context";
import { useLoginPostData } from "../hooks/useLoginPostData";
import { motion } from "framer-motion";

import FormikControl from "./formik-components/FormikControl";
import Button from "./Button";
import ErrorModal from "./ErrorModal";

import korsolLogo from "../images/korsol_logo.png";
import { AxiosError } from "axios";
import { containerVariants } from "../utils/framerMotionAnimationsVariants";

interface Props {
  authenticate: (tokenPassed: string) => void;
}
export const Login = (props: Props) => {
  ////vars
  const { authenticate } = props;
  const { t } = useTranslation();
  const { currentColor } = useThemeProvider();
  const { mutate, isLoading } = useLoginPostData();
  // const { authenticate } = useAuthentication();
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Default error");

  ////formik
  const initialValuesLoginForm: LoginFormValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(t("common:emailRequired"))
      .email(t("common:emailFormat")),

    password: Yup.mixed()
      .test({
        name: "required",
        message: t("common:passwordRequired"),
        test: (value) => {
          if (!value) return false;
          if (value.trim().length < 1) return false;
          return true;
        },
      })
      .test({
        name: "minDIgits",
        message: t("common:passwordMin2Digits"),
        test: (value) => {
          if (!value) return false;
          let numberOfOccurrence = 0;
          [...value].forEach((letter) => {
            if (letter.match(/\d/)) numberOfOccurrence++;
          });
          return numberOfOccurrence >= 2;
        },
      })
      .test({
        name: "minCapitalLetters",
        message: t("common:passwordMin2Capitals"),
        test: (value) => {
          if (!value) return false;
          let numberOfOccurrence = 0;
          [...value].forEach((letter) => {
            if (letter.match(/[A-Z]/)) numberOfOccurrence++;
          });
          return numberOfOccurrence >= 2;
        },
      })
      .test({
        name: "minSmallLetters",
        message: t("common:passwordMin2SmallLetters"),
        test: (value) => {
          if (!value) return false;
          let numberOfOccurrence = 0;
          [...value].forEach((letter) => {
            if (letter.match(/[a-z]/)) numberOfOccurrence++;
          });
          return numberOfOccurrence >= 2;
        },
      })
      .test({
        name: "minSpecialCharacters",
        message: t("common:passwordMin2SpecialChars"),
        test: (value) => {
          if (!value) return false;
          let numberOfOccurrence = 0;
          [...value].forEach((letter) => {
            if (letter.match(/[^A-Za-z 0-9]/)) numberOfOccurrence++;
          });
          return numberOfOccurrence >= 2;
        },
      }),
  });

  const submitHandler = async (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>
  ) => {
    const loginBody: LoginFormValues = {
      email: values.email,
      password: values.password,
    };

    mutate(loginBody, {
      onSuccess: (data) => {
        if (data.data.authToken) {
          try {
            authenticate(data.data.authToken);
          } catch (error) {
            throw new Error(
              "Not implemented -> Token was not decoded -> modal or any info that somethuing went wrong"
            );
          }
        }
        formikHelpers.setSubmitting(false);
        formikHelpers.resetForm();
      },
      onError: (error) => {
        const axiosError: AxiosError<any, any> = error as AxiosError;
        if (axiosError) {
          setErrorMessage(axiosError.response?.data?.message);
        }
        //confirmation modal
        setIsShowConfirmationModal(true);
        const timer: any = () => {
          setTimeout(() => {
            setIsShowConfirmationModal(false);
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
          }, 1600);
        };
        timer();
        clearTimeout(timer);
      },
    });
  };

  //jsx
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-main-bg dark:bg-main-dark-bg opacity-95 flex flex-col justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ClimbingBoxLoader
            color={currentColor}
            size={12}
            speedMultiplier={0.8}
          />
        </motion.div>
      )}

      {isShowConfirmationModal && (
        <ErrorModal error={errorMessage} onClear={() => {}} />
      )}

      <Formik
        initialValues={initialValuesLoginForm}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {(formik: FormikProps<LoginFormValues>) => {
          return (
            <Form>
              <div className="min-h-screen flex flex-col items-center justify-center bg-main-bg dark:bg-main-dark-bg ">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-6 rounded-2xl px-8 shadow-xl">
                  <div className="flex flex-col justify-center items-center">
                    <div>
                      <img
                        src={korsolLogo}
                        alt="korsol logo"
                        className="rounded-full w-14 h-14 dark:border-2"
                      />
                    </div>

                    <div className="pt-2">
                      <span className="font-bold uppercase text-3xl">
                        Korsol Monitoring System
                      </span>
                    </div>

                    <div className="pt-12">
                      <span className="font-bold uppercase text-xl">Login</span>
                    </div>

                    <div className="w-full pr-6">
                      <FormikControl
                        control="input"
                        type="text"
                        label="Email:"
                        name="email"
                        placeholder={t("common:emailPlaceholder")}
                        additionalClass=""
                      />
                    </div>

                    <div className="w-full pr-6">
                      <FormikControl
                        control="input"
                        type="text"
                        label={t("common:password")}
                        name="password"
                        placeholder={t("common:passwordPlaceholder")}
                        additionalClass=""
                      />
                    </div>

                    <div className="pt-6">
                      <Button
                        disabled={!formik.isValid || formik.isSubmitting}
                        type="submit"
                        color="white"
                        bgColor={currentColor}
                        text="Login"
                        borderRadius="10px"
                        size="md"
                        additionalClass="px-7"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </motion.div>
  );
};

// import { AuthResponse, LoginFormValues } from "../types/typings";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useHttpClient } from "../hooks/http-hook";

// import Button from "../components/Button";
// import FormikControl from "../components/formik-components/FormikControl";
// import ErrorModal from "../components/ErrorModal";

// const Login: NextPage = (props) => {
//   ////vars
//   const { isLoggedIn, authenticate, expirationDate } = useAuthContext();
//   const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(true);
//   const router = useRouter();
//   const { isLoading, error, sendRequest, clearError } =
//     useHttpClient<AuthResponse>();

//   const submitHandler = async (
//     values: LoginFormValues,
//     formikHelpers: FormikHelpers<LoginFormValues>
//   ) => {
//     try {
//       const responseData = await sendRequest(
//         `${process.env.NEXT_PUBLIC_API_BASE_ADDRESS}/api/login`,
//         "POST",
//         JSON.stringify({ email: values.email, password: values.password }),
//         {
//           "Content-Type": "application/json",
//         }
//       );

//       authenticate(responseData);
//     } catch (error) {
//       formikHelpers.setSubmitting(false);
//       formikHelpers.resetForm();

//       //confirmation modal
//       setIsShowConfirmationModal(true);
//       const timer = () => {
//         setTimeout(() => {
//           setIsShowConfirmationModal(false);
//         }, 1600);
//       };
//       timer();

//       clearTimeout(timer);
//     }

//     formikHelpers.setSubmitting(false);
//     formikHelpers.resetForm();
//   };

//   //redirect when logged in
//   useEffect(() => {
//     if (isLoggedIn) router.push("/");
//   }, [isLoggedIn]);

//
// };

// export default Login;
