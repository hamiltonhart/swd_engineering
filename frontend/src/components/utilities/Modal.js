import React from "react";
import ReactDOM from "react-dom";
import { ModalOverlay, ModalWrapper } from "../../styled/containers";
import { Icon, CloseIcon } from "../../styled/icons";

export const Modal = ({ children, isShowing }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay>{children}</ModalOverlay>
        </>,
        document.body
      )
    : null;
};

export const ModalArea = ({ children }) => {
  return <ModalWrapper>{children}</ModalWrapper>;
};

export const ModalCloseIcon = ({ toggle }) => {
  return (
    <Icon
      position="absolute"
      top="42px"
      right="60px"
      cursor="pointer"
      onClick={e => {
        e.stopPropagation();
        toggle();
      }}
    >
      <CloseIcon
        className="modal-close-button"
        data-dismiss="modal"
        aria-label="Close"
      />
    </Icon>
  );
};
