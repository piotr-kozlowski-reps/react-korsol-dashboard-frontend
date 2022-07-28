import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

interface ModalOverlayProps {
  className?: string;
  style?: React.CSSProperties | undefined;
  headerClass?: string;
  header?: string;
  contentClass?: string;
  children?: React.ReactNode;
  footerClass?: string;
  footer?: React.ReactNode;
  show?: boolean;
  onCancel?: () => void;
  //   onSubmit: PropTypes.func, //optional: onSubmit function to Form in ModalOverlay (if Form needed)
}

interface ModalProps {
  show: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
  header?: string;
  headerClass?: string;
}

const ModalOverlay = (props: ModalOverlayProps) => {
  const content = (
    <div
      className={`z-50 fixed top-1/4 left-1/4 w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-6 rounded-2xl px-8 shadow-xl ${
        props.className ? props.className : ""
      }`}
      style={props.style}
      data-testid="modal"
    >
      <header
        className={`w-full dark:text-gray-200 font-bold uppercase text-3xl text-center ${
          props.headerClass ? props.headerClass : ""
        }`}
      >
        <h2>{props.header}</h2>
      </header>
      <div className="p-6 mt-4 font-medium text-center">
        <div className={`${props.contentClass ? props.contentClass : ""}`}>
          {props.children}
        </div>
        <footer className={`p-4 ${props.footerClass ? props.footerClass : ""}`}>
          {props.footer}
        </footer>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook")!);
};

const Modal = (props: ModalProps) => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
