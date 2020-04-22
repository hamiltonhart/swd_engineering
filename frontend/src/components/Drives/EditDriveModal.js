import React, { useState } from "react";

import { EditDriveForm } from "./EditDriveForm";
import { PageHeading } from "../../styled/typography";

// import { Modal, ModalArea, ModalCloseIcon } from "../utilities";
import { Modal, ModalContent } from "../global/Modal";

export const EditDriveModal = ({ drive, isShowing, toggle }) => {
  return (
    <Modal isShowing={isShowing}>
      <ModalContent toggle={toggle}>
        <PageHeading>{`Edit Drive # ${drive.driveNumber}`}</PageHeading>
        <EditDriveForm toggle={toggle} driveId={drive.id} drive={drive} />
      </ModalContent>
    </Modal>
  );
};
