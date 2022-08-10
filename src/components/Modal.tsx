import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { errorModalVariants } from "../utils/framerMotionAnimationsVariants";

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
    <motion.div
      className={`z-50 fixed top-1/4 left-1/4 w-1/2 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-6 rounded-2xl px-8 shadow-xl ${
        props.className ? props.className : ""
      }`}
      style={props.style}
      data-testid="modal"
      variants={errorModalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
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
    </motion.div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook")!);
};

const Modal = (props: ModalProps) => {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <ModalOverlay {...props} />
    </Fragment>
  );
};

export default Modal;
