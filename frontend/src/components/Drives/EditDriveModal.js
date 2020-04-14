import React, { useState } from "react";

import { EditDriveForm } from "./EditDriveForm";
import { PageHeading } from "../../styled/typography";

import { Modal, ModalArea, ModalCloseIcon } from "../utilities";

export const EditDriveModal = ({ driveId, drive, isShowing, toggle }) => {
  return (
    <Modal isShowing={isShowing}>
      <ModalArea>
        <ModalCloseIcon toggle={toggle} />
        <PageHeading>{`Edit Drive # ${drive.driveNumber}`}</PageHeading>
        <EditDriveForm toggle={toggle} driveId={driveId} drive={drive} />
      </ModalArea>
    </Modal>
  );
};
