import React from "react";

import Modal from "./Modal";
import Button from "./Button";

interface ErrorModalProps {
  onClear: () => void;
  error: string | null | undefined;
  headerClass?: string;
  header?: string;

  children?: React.ReactNode;
}

const ErrorModal = (props: ErrorModalProps) => {
  return (
    <Modal
      header="Błąd!"
      onCancel={props.onClear}
      headerClass={props.headerClass ? props.headerClass : ""}
      show={!!props.error}
    >
      <div id="login">
        <div className="project-details center">
          <p>{props.error}</p>
        </div>
      </div>
      <div className="center"></div>
    </Modal>
  );
};

export default ErrorModal;
