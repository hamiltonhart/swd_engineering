import React from "react";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export const NewContactIconButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} color="primary">
      <AddIcon />
    </IconButton>
  );
};
