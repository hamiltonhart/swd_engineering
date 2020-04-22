import React from "react";

import { makeStyles, Paper, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "800px",
    minWidth: "300px",
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  contentHeader: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export const ModalContent = ({ children, toggle, closeIcon = true }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {closeIcon && (
        <div className={classes.contentHeader}>
          <IconButton onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
      {children}
    </Paper>
  );
};
