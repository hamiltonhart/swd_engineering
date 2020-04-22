import React from "react";
import ReactDOM from "react-dom";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
    width: "100%",
    height: "100%",
  },
}));

export const Modal = ({ children }) => {
  const classes = useStyles();

  return ReactDOM.createPortal(
    <>
      <div className={classes.root}>{children}</div>
    </>,
    document.body
  );
};
