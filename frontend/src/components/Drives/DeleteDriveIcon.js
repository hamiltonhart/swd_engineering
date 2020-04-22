import React from "react";

import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export const DeleteDriveIcon = ({ driveId }) => {
  return (
    <IconButton>
      <DeleteForeverIcon />
    </IconButton>
  );
};
