import React from "react";
import InputFormik from "./InputFormik";

interface FormikControlProps {
  control: string;
}

const FormikControl = (props: any) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <InputFormik {...rest} />;

    default:
      return null;
  }
};

export default FormikControl;
