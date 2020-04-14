import React from "react";
import ReactDOM from "react-dom";
import {
  ModalOverlay,
  ModalWrapper,
  FlexWrapper
} from "../../styled/containers";
import { Icon, CloseIcon } from "../../styled/icons";
import { DriveDetail } from "./DriveDetail";
import { EditDriveModal } from "./EditDriveModal";
import { BlackButton } from "../../styled/buttons";

import { useModal } from "../../utils";

export const DriveDetailEditModal = ({ isShowingOverlay, toggleOverlay }) => {
  const { isShowing, toggle } = useModal();

  return isShowingOverlay
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay>
            <ModalWrapper>
              <Icon
                position="absolute"
                top="8%"
                right="10%"
                cursor="pointer"
                onClick={e => {
                  e.stopPropagation();
                  isShowing ? toggle() : toggleOverlay();
                }}
              >
                <CloseIcon
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                />
              </Icon>
              {isShowing ? (
                <EditDriveModal isShowingEdit={isShowing} toggleEdit={toggle} />
              ) : (
                <DriveDetail />
              )}
              <FlexWrapper padding="0">
                {!isShowing && (
                  <BlackButton small onClick={() => toggle()}>
                    Edit
                  </BlackButton>
                )}
              </FlexWrapper>
            </ModalWrapper>
          </ModalOverlay>
        </>,
        document.body
      )
    : null;
};
