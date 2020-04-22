import React from "react";

import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { useToggle } from "../../utils";
import { EditDriveModal } from "./EditDriveModal";

export const EditDriveIcon = ({ drive }) => {
  const { isShowing, toggle } = useToggle();
  return (
    <>
      <IconButton onClick={toggle}>
        <EditIcon />
      </IconButton>
      {isShowing && (
        <EditDriveModal
          driveId={drive.id}
          drive={drive}
          isShowing={isShowing}
          toggle={toggle}
        />
      )}
    </>
  );
};
