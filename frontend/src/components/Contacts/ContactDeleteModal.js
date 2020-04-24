import React from "react";

import { useMutation } from "@apollo/react-hooks";
import { DELETE_CONTACT, ALL_CONTACTS_QUERY, DELETE_DRIVE } from "../../gql";

import { makeStyles, Typography, Button } from "@material-ui/core";
import { Modal, ModalContent } from "../global/Modal";

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

export const ContactDeleteModal = ({
  contactId,
  contactName,
  toggle,
  setContactId,
}) => {
  const [deleteContact, { error }] = useMutation(DELETE_CONTACT);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteContact({
      variables: { contactId },
      refetchQueries: [{ query: ALL_CONTACTS_QUERY }],
      onCompleted: handleComplete(),
    });
  };

  const handleComplete = () => {
    toggle();
    setContactId(null);
  };
  const classes = useStyles();
  return (
    <Modal>
      <ModalContent toggle={toggle} closeIcon={false}>
        <div className={classes.root}>
          <Typography variant="h5" gutterBottom>
            This action cannot be undone.
          </Typography>
          <Typography>{`Are you sure you want to delete ${contactName}?`}</Typography>
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
  );
};
