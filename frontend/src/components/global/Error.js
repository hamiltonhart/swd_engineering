import React from "react";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useModal } from "../../utils";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Error = ({ error }) => {
  const { isShowing, toggle } = useModal();
  return (
    <Snackbar open={isShowing} autoHideDuration={6000} onClose={() => toggle()}>
      <Alert onClose={() => toggle()} severity="error">
        {error.message}
      </Alert>
    </Snackbar>
  );
};
