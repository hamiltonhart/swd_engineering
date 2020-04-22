import React from "react";

import { useMutation } from "@apollo/react-hooks";
import { DELETE_DRIVE, ALL_DRIVES_QUERY } from "../../gql";

import { makeStyles, IconButton, Typography, Button } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { Modal, ModalContent } from "../global/Modal";
import { Error } from "../global";
import { useToggle } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));
export const DeleteDriveIcon = ({ drive }) => {
  const { isShowing, toggle } = useToggle();

  const [deleteDrive, { error }] = useMutation(DELETE_DRIVE);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteDrive({
      variables: { driveId: drive.id },
      refetchQueries: [{ query: ALL_DRIVES_QUERY }],
      onCompleted: { toggle },
    });
  };

  const classes = useStyles();
  return (
    <>
      {error && <Error error={error} />}
      <IconButton onClick={toggle}>
        <DeleteForeverIcon />
      </IconButton>
      {isShowing && (
        <Modal>
          <ModalContent toggle={toggle} closeIcon={false}>
            <div className={classes.root}>
              <Typography variant="h5" gutterBottom>
                This action cannot be undone.
              </Typography>
              <Typography>{`Are you sure you want to delete Drive #${drive.driveNumber}?`}</Typography>
              <div className={classes.buttons}>
                <Button variant="outlined" onClick={toggle}>
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(e) => handleDelete(e)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
