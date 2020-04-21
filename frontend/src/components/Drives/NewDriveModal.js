import React from "react";
import { useModal } from "../../utils";
import { NewDriveForm } from "./NewDriveForm";

import { Modal, ModalArea, ModalCloseIcon } from "../utilities";
import { PageHeading } from "../../styled/typography";

import { makeStyles, CircularProgress, Button } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { GET_LAST_DRIVE } from "../../gql";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  button: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export const NewDriveModal = () => {
  const { isShowing, toggle } = useModal();

  const { data, loading, error } = useQuery(GET_LAST_DRIVE);

  const classes = useStyles();
  return (
    <>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        large
        onClick={() => toggle()}
      >
        New Drive
      </Button>

      <Modal isShowing={isShowing}>
        <ModalArea className={classes.root}>
          <ModalCloseIcon toggle={toggle} />
          <PageHeading>Add Drives</PageHeading>
          {loading && <CircularProgress />}
          {data ? (
            <NewDriveForm
              className={classes.form}
              toggle={toggle}
              nextDriveNumber={data.lastDrive.driveNumber + 1}
            />
          ) : (
            <NewDriveForm
              className={classes.form}
              toggle={toggle}
              nextDriveNumber="1"
            />
          )}
        </ModalArea>
      </Modal>
    </>
  );
};
