import React from "react";

import { makeStyles, Typography, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { useMutation } from "@apollo/react-hooks";
import { RELEASE_DRIVE, ALL_DRIVES_QUERY } from "../../gql";

import { useToggle } from "../../utils";
import { Modal, ModalContent } from "../global/Modal";
import { Error } from "../global";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    maxWidth: "325px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

export const ClearDriveProjectIcon = ({ drive, driveProject }) => {
  const { isShowing, toggle } = useToggle();

  const [releaseDrive, { error }] = useMutation(RELEASE_DRIVE);

  const handleReleaseDrive = (e) => {
    e.preventDefault();
    releaseDrive({
      variables: { driveId: drive.id },
      refetchQueries: [{ query: ALL_DRIVES_QUERY }],
      onCompleted: { toggle },
    });
  };

  const classes = useStyles();
  return (
    <>
      <IconButton onClick={toggle}>
        <ClearIcon />
      </IconButton>
      {isShowing && (
        <Modal>
          {error && <Error error={error} />}
          <ModalContent toggle={toggle} closeIcon={false}>
            <div className={classes.root}>
              <Typography variant="h5" align="center" gutterBottom>
                This action cannot be undone.
              </Typography>
              <Typography align="center">{`Are you sure you want to release Drive #${drive.driveNumber} from ${drive.rentalProjects[0].project.title}?`}</Typography>
              <div className={classes.buttons}>
                <Button variant="outlined" onClick={toggle}>
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(e) => handleReleaseDrive(e)}
                >
                  Release
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
