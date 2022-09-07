import React from "react";
import InputFormik from "./InputFormik";
import SelectFormik from "./SelectFormik";

interface FormikControlProps {
  control: string;
}

const FormikControl = (props: any) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <InputFormik {...rest} />;

    case "select":
      return <SelectFormik {...rest} />;

    default:
      return null;
  }
};

export default FormikControl;
